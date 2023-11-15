using System.ComponentModel.DataAnnotations;

namespace MicroServizio3.Entities
{
    public class Logs
    {
        [Key]
        public int idLog { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string Messaggio { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(30)]
        public DateTime Timestamp { get; set; } = DateTime.Now;

        
        [MinLength(3)]
        [MaxLength(20)]
        public string EndpointUrl { get; set; }
    }
}
