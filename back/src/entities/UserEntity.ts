import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Credential } from "./CredentialsEntities";
import { Appointment } from "./AppointmentEntity";


@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 255, nullable: false})
    name: string;
    
     @Column({type: "varchar", length: 255, nullable: false})
    email: string;
    @Column({type: "date", nullable: false})
    birthdate: Date;

    @Column({type: "varchar", unique:true, nullable: false})
     nDni: number;
    @OneToOne(() => Credential, { cascade: true })
    @JoinColumn()
    credentials: Credential;
    
    @OneToMany( () => Appointment, appointment => appointment.user)
    appointments: Appointment[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}