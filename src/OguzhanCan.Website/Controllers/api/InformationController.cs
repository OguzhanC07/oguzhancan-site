using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OguzhanCan.Website.Models;

namespace OguzhanCan.Website.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class InformationController : ControllerBase
    {
        [HttpGet("[action]")]
        public IActionResult FetchInformationForClassic()
        {
            return Ok();
        }

        [HttpGet("[action]")]
        public IActionResult FetchInformationForMario()
        {
            var portfolioInformation = new List<PortfolioInformation>();


            return Ok();
        }
    }
}
