"""Add chat channel_type, room_id, and direct_conversations table

Revision ID: e4f5a6b7c8d9
Revises: d31a0b80a588
Create Date: 2026-06-15
"""
from alembic import op
import sqlalchemy as sa


revision = 'e4f5a6b7c8d9'
down_revision = 'd31a0b80a588'
branch_labels = None
depends_on = None


def column_exists(table, column):
    bind = op.get_bind()
    result = bind.execute(sa.text(
        f"SELECT EXISTS (SELECT 1 FROM information_schema.columns "
        f"WHERE table_name='{table}' AND column_name='{column}')"
    ))
    return result.scalar()


def table_exists(table):
    bind = op.get_bind()
    result = bind.execute(sa.text(
        f"SELECT EXISTS (SELECT 1 FROM information_schema.tables "
        f"WHERE table_name='{table}')"
    ))
    return result.scalar()


def upgrade() -> None:
    if not column_exists('chat_messages', 'channel_type'):
        op.add_column('chat_messages', sa.Column('channel_type', sa.String(20), server_default='mentor', nullable=True))
        op.create_index('ix_chat_messages_channel_type', 'chat_messages', ['channel_type'])

    if not column_exists('chat_messages', 'room_id'):
        op.add_column('chat_messages', sa.Column('room_id', sa.String(255), nullable=True))
        op.create_index('ix_chat_messages_room_id', 'chat_messages', ['room_id'])

    if not table_exists('direct_conversations'):
        op.create_table(
            'direct_conversations',
            sa.Column('id', sa.Integer(), primary_key=True, index=True),
            sa.Column('user1_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
            sa.Column('user2_id', sa.Integer(), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
            sa.Column('last_message_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
            sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
            sa.UniqueConstraint('user1_id', 'user2_id', name='uq_dm_pair'),
        )


def downgrade() -> None:
    if table_exists('direct_conversations'):
        op.drop_table('direct_conversations')
    if column_exists('chat_messages', 'room_id'):
        op.drop_index('ix_chat_messages_room_id', 'chat_messages')
        op.drop_column('chat_messages', 'room_id')
    if column_exists('chat_messages', 'channel_type'):
        op.drop_index('ix_chat_messages_channel_type', 'chat_messages')
        op.drop_column('chat_messages', 'channel_type')
