import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('revoked_tokens')
export class RevokedToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ length: 200 })
  jti!: string;

  @Column({ type: 'timestamptz' })
  expiresAt!: Date;
}


