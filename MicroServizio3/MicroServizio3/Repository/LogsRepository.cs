using MicroServizio3.DataSource;
using MicroServizio3.DTOs;

namespace MicroServizio3.Repository
{
    public class LogsRepository : ILogsRepository
    {
        private readonly DbSettingsContext _context;

        public LogsRepository(DbSettingsContext context)
        {
            _context = context;
        }
        public Task<bool> GetException(LogsDto log)
        {
            throw new NotImplementedException();
        }
    }
}
