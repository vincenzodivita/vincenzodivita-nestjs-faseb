using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MicroServizio3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogsController : ControllerBase
    {
    
        // POST api/<LogsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

    }
}
