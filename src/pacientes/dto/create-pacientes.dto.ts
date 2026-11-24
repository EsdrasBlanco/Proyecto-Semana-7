export class CreatePacientesDto {
  name: string;
  email: string;
  birthDate: string | Date;
  phone?: string;
}
