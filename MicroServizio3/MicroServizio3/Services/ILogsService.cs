using MicroServizio3.DTOs;

namespace MicroServizio3.Services
{
    public interface ILogsService
    {
        Task<LogsDto> GetException(LogsDto log);
    }
}
