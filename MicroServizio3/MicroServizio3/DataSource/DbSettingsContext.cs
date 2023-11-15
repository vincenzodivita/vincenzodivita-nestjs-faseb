using Microsoft.EntityFrameworkCore;

namespace MicroServizio3.DataSource
{
    public class DbSettingsContext : DbContext
    {
        public DbSettingsContext() { }
        public DbSettingsContext(DbContextOptions<DbSettingsContext> options) : base(options) { }


        public DbSet<Entities.Logs> Logs { get; set; }
    }
}
