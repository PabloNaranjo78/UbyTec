﻿namespace UbyTECAPI.Models
{
    public class Cliente
    {
        public int idCliente { get; set; }
        public string? usuario { get; set; }
        public string? pass { get; set; }
        public string? nombre { get; set; }
        public string? apellidos { get; set; }        
        public string? fechaNac { get; set; }
        public string? provincia { get; set; }
        public string? canton { get; set; }
        public string? distrito { get; set; }
    }
}