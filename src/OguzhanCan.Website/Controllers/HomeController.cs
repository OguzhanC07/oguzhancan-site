using Microsoft.AspNetCore.Mvc;
using OguzhanCan.Website.Models;
using System.Diagnostics;

namespace OguzhanCan.Website.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
