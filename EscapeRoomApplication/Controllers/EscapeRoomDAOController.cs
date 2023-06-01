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
        public DAOResponseObject Get(string methodName, string parameters)
        {
            DAOParametersObject DAOParameters = JsonConvert.DeserializeObject<DAOParametersObject>(parameters);
            DAOResponseObject DAOResponse = EscapeRoomDAO.MakeDatabaseCall(methodName, DAOParameters);
            return DAOResponse;
        }
    }
}