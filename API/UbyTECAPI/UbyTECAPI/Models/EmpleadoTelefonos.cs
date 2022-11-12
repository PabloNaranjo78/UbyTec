﻿using Npgsql;

namespace UbyTECAPI.Models
{
    public class EmpleadoTelefonos : Entity<EmpleadoTelefonos>
    {
        protected override string? atributes
        {
            get => "idEmpleado,telefono";
        }

        protected override string? entity
        {
            get => "empleado_telefonos";
        }
        protected override string? searchAtribute
        {
            get => "idEmpleado";
        }
        public int idEmpleado { get; set; }
        public int telefono { get; set; }

        protected override EmpleadoTelefonos createEntity(NpgsqlDataReader rd)
        {
            return new EmpleadoTelefonos
            {
                idEmpleado = Convert.ToInt32(rd["idEmpleado"]),
                telefono = Convert.ToInt32(rd["telefono"])
            };
        }

        protected override string paramsToString()
        {
            return $"{idEmpleado},{telefono}";
        }

        protected override string getID()
        {
            return idEmpleado.ToString();
        }
    }
}
