import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 letras")
    .max(50, "El nombre no puede ser mayor de 50 letras"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Número de teléfono inválido"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 letras")
    .max(50, "El nombre no puede ser mayor de 50 letras"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Número de teléfono inválido"),
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z
    .string()
    .min(5, "La dirección debe tener al menos 5 letras")
    .max(500, "La dirección no puede ser mayor de 500 letras"),
  occupation: z
    .string()
    .min(2, "El trabajo debe tener al menos 2 letras")
    .max(500, "El trabajo no puede ser mayor de 500 letras"),
  emergencyContactName: z
    .string()
    .min(2, "El nombre de contacto debe tener al menos 2 letras")
    .max(50, "El nombre de contacto no puede ser mayor de 50 letras"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "Número de teléfono inválido"
    ),
  primaryPhysician: z.string().min(2, "Seleccione al menos un profesional"),
  insuranceProvider: z
    .string()
    .min(2, "El nombre de insurance debe tener al menos 2 letras")
    .max(50, "El nombre de insurance no puede ser mayor de 50 letras"),
  insurancePolicyNumber: z
    .string()
    .min(2, "El número de política de seguro debe tener al menos 2 letras")
    .max(50, "El número de política de seguro no puede ser mayor de 50 letras"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Debe aceptar el tratamiento para continuar",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Debe aceptar la divulgación para continuar",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Debe aceptar la privacidad para continuar",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, " Seleccione al menos un profesional"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "La razón de la consulta debe tener al menos 2 letras")
    .max(500, "La razón de la consulta no puede ser mayor de 500 letras"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Seleccione al menos un profesional"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "Seleccione al menos un profesional"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "La razón de la cancelación debe tener al menos 2 letras")
    .max(500, "La razón de la cancelación no puede ser mayor de 500 letras"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}