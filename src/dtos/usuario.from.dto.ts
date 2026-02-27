import { IsString, IsNumber, Min, Max, IsNotEmpty } from "class-validator";

export class UsuarioSaludDTO {
  @IsString({ message: "El nombre debe ser un texto." })
  nombre!: string;

  @IsNumber({}, { message: "La edad debe ser un número." })
  @Min(1, { message: "La edad mínima es 1 año." })
  @Max(120, { message: "La edad máxima es 120 años." })
  edad!: number;

  @IsString({ message: "La actividad física debe ser un texto." })
  actividadFisica!: string;

  @IsNumber({}, { message: "Las horas de sueño deben ser un número." })
  @Min(3, { message: "Debes dormir al menos 3 horas." })
  @Max(12, { message: "No es recomendable más de 12 horas de sueño." })
  horasSueno!: number;

  @IsNumber({}, { message: "El consumo de agua debe ser un número." })
  @Min(1, { message: "Debes beber al menos 1 vaso de agua." })
  @Max(20, { message: "No se recomienda más de 20 vasos de agua al día." })
  vasosAgua!: number;

  @IsString({ message: "El campo 'fuma' debe ser un texto (sí/no)." })
  fuma!: string;

  @IsString({ message: "El objetivo debe ser un texto." })
  objetivo!: string;
}

export class UsuarioPreguntaDTO extends UsuarioSaludDTO {
  @IsString({ message: "La pregunta debe ser un texto." })
  @IsNotEmpty({ message: "La pregunta no puede estar vacía." })
  pregunta!: string;
}