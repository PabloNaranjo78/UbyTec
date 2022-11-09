namespace UbyTECAPI.Models
{
    public class Comercio
    {
        public int idComercio { get; set; }
        public int idAdmin { get; set; }
        public string? tipo { get; set; }
        public string? nombre { get; set; }
        public string? correo { get; set; }
        public int sinpe { get; set; }
        public bool solicitud { get; set; }
        public string? provincia { get; set; }
        public string? canton { get; set; }
        public string? distrito { get; set; }
    }
}
