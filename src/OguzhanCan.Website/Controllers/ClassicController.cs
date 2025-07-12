using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using OguzhanCan.Website.Models;
using OguzhanCan.Website.Resources;
using System.Globalization;
using System.Reflection;

namespace OguzhanCan.Website.Controllers
{
    public class ClassicController : Controller
    {
        private readonly IStringLocalizer _localizer;
        public ClassicController(IStringLocalizerFactory factory)
        {
            var type = typeof(PortfolioTexts); // dummy class for localization
            _localizer = factory.Create("PortfolioTexts", Assembly.GetExecutingAssembly().GetName().Name!);
        }

        public IActionResult Index()
        {
            var classicInformation = new ClassicPortfolioInformation
            {
                AboutMe = new PortfolioInformation { Title = _localizer["AboutMe_Title"], Content = _localizer["AboutMe_Description"] },
                ContactInformation = new List<PortfolioInformation>
                {
                    new PortfolioInformation{ Title = "Email:", InternalDescription = "mailto:hello@oguzhancan.com", Content ="hello@oguzhancan.com"},
                    new PortfolioInformation{ Title = "Linkedin:", InternalDescription = "https://www.linkedin.com/in/oguzhan-can/", Content = "/in/oguzhan-can/"},
                    new PortfolioInformation{ Title = "Github:", InternalDescription = "https://github.com/OguzhanC07", Content = "OguzhanC07"},
                },
                Projects = new List<PortfolioInformation>
                {
                    new PortfolioInformation { Title = _localizer["Projects_Title_1"], Content = _localizer["Projects_Description_1"] },
                    new PortfolioInformation { Title = _localizer["Projects_Title_2"], Content = _localizer["Projects_Description_2"] }
                },

                BlogPosts = new List<PortfolioInformation>
                {
                    new PortfolioInformation { Title = "Blog Post 1", Content = "Blog post description 1"},
                    new PortfolioInformation { Title = "Blog Post 2", Content = "Blog post description 2"}
                }
            };
            return View(classicInformation);
        }
    }
}
