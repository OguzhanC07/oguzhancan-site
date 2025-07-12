using Microsoft.AspNetCore.Mvc;

namespace OguzhanCan.Website.Controllers
{
    public class ClassicController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
