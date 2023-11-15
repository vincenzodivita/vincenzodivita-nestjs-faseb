using MicroServizio3.DTOs;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Text;

namespace MicroServizio3.Services
{
    public class LogsService : ILogsService
    {
        public async Task<LogsDto> GetException(LogsDto log)
        {
            using (var httpClient = new HttpClient())
            {
                try
                {
                    var response = await httpClient.GetAsync("http://localhost:3000/prodotti");
                    response.EnsureSuccessStatusCode();

                }
                catch (HttpRequestException ex)
                {

                    var errorMessage = await ex.Response.Content.ReadAsStringAsync();

                }
            }
        }
    }
        
}
