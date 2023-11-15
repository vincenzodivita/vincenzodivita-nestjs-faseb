using MicroServizio3.DTOs;

namespace MicroServizio3.Repository
{
    public interface ILogsRepository
    {
        Task<LogsDto> GetException(LogsDto log);
    }
}
