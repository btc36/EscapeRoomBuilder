using Microsoft.AspNetCore.Mvc;
using EscapeRoomApplication;
using EscapeRoomApplication.Objects;
using Newtonsoft.Json;

namespace EscapeRoomApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]

    //Add Controller URL to setupProxy.js
    public class EscapeRoomDAOController : ControllerBase
    {
        private EscapeRoomDAO EscapeRoomDAO;

        private readonly ILogger<EscapeRoomDAOController> _logger;

        public EscapeRoomDAOController(ILogger<EscapeRoomDAOController> logger)
        {
            _logger = logger;
            EscapeRoomDAO = new EscapeRoomDAO();
        }

        [HttpGet]
        public string Get()
        {
            string result = EscapeRoomDAO.sampleFunction("TEST");
            TestObject test = new TestObject(result);
            return JsonConvert.SerializeObject(test);
        }
    }
}