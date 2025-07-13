using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using OguzhanCan.Website.Models;
using OguzhanCan.Website.Resources;
using System.Reflection;

namespace OguzhanCan.Website.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class InformationController : ControllerBase
    {
        private readonly IStringLocalizer _localizer;
        public InformationController(IStringLocalizerFactory factory)
        {
            var type = typeof(PortfolioTexts); // dummy class for localization
            _localizer = factory.Create("PortfolioTexts", Assembly.GetExecutingAssembly().GetName().Name!);
        }

        [HttpGet("[action]")]
        public IActionResult FetchInformationForMario()
        {
            var portfolioInformation = new List<PortfolioInformation>
            {
                new PortfolioInformation
                {
                    Position = 0,
                    Title = _localizer["Mario_WelcomeText"],
                    Content = _localizer["Mario_WelcomeDescription"]
                },
                new PortfolioInformation
                {
                    Position = 400,
                    Title = _localizer["Mario_AboutMe_Title"],
                    Content = string.Format(_localizer["Mario_AboutMe_Description"], DateTime.Now.Year - 2021)
                },
                new PortfolioInformation
                {
                    Position = 800,
                    Title = _localizer["Mario_Skills_Title"],
                    Content = @$"<h3>Microsoft</h3>
                        <div>
                            <span class=""skill-tag"">Microsoft Dynamics365 CRM</span>
                            <span class=""skill-tag"">Power Apps</span>
                            <span class=""skill-tag"">Power Platform</span>
                            <span class=""skill-tag"">Power Pages</span>
                            <span class=""skill-tag"">Power Automate</span>
                        </div>
                        <h3>Frontend</h3>
                         <div>
                            <span class=""skill-tag"">JavaScript</span>
                            <span class=""skill-tag"">CSS3</span>
                            <span class=""skill-tag"">HTML5</span>
                            <span class=""skill-tag"">Canvas</span>
                            </div>
                        <h3>Backend</h3>
                         <div>
                             <span class=""skill-tag"">MS SQL</span>
                             <span class=""skill-tag"">.Net</span>
                             <span class=""skill-tag"">PostgreSQL</span>
                         </div>
                         <h3>{_localizer["Mario_Skills_ToolsAndOthers"]}</h3>
                         <div>
                             <span class=""skill-tag"">Git</span>
                             <span class=""skill-tag"">JMeter</span>
                             <span class=""skill-tag"">CI/CD</span>
                             <span class=""skill-tag"">Selenium</span>
                             <span class=""skill-tag"">Docker</span>
                         </div>"
                },
                new PortfolioInformation
                {
                    Position = 1200,
                    Title = "🚀 Featured Projects",
                    Content = @$"<div class=""project-item"">
                             <h3>🌟 {_localizer["Projects_Title_1"]}</h3>
                             <p><strong>Tech:</strong> Power Apps, .Net, MSSQL</p>
                             <p>{_localizer["Projects_Description_1"]}</p>
                         </div>
                         <div class=""project-item"">
                             <h3>🎮 {_localizer["Projects_Title_2"]}</h3>
                             <p><strong>Tech:</strong> Power Apps, .Net, MSSQL, Javascript</p>
                             <p>{_localizer["Projects_Description_2"]}</p>
                         </div>"
                },
                new PortfolioInformation
                {
                    Position = 1600,
                    Title = "💼 Work Experience",
                    Content = @$"<div class=""project-item"">
                                <h3> Microsoft Dynamics Crm Developer</h3>
                                <p><strong>Omerd Business Solutions.(2022 - {_localizer["Mario_WorkExperience_Present"]})</strong></p>
                                <p>{_localizer["Mario_Work_Experience_1"]}</p>
                         </div>
                         <div class=""project-item"">
                             <h3>Junior Software Test Engineer</h3>
                             <p><strong>FileOrbis (2021 - 2022)</strong></p>
                             <p>{_localizer["Mario_Work_Experience_2"]}</p>
                         </div>"
                },
                new PortfolioInformation
                {
                    Position = 2000,
                    Title = _localizer["Mario_RecentProjects_Title"],
                    Content = @$"<div class=""project-item"">
                             <h3>🌟 {_localizer["Mario_Recent_Projects_Title_1"]}</h3>
                             <p><strong>Tech:</strong> Power Apps, .Net, Javascript, Html, Css</p>
                             <p>{_localizer["Mario_Recent_Projects_Description_1"]}</p>
                         </div>
                         <div class=""project-item"">
                             <h3>🎮 {_localizer["Mario_Recent_Projects_Title_2"]}</h3>
                             <p><strong>Tech:</strong> Power Apps, .Net, Javascript, Html, Css</p>
                             <p>{_localizer["Mario_Recent_Projects_Description_2"]}</p>
                         </div>"
                },
                new PortfolioInformation
                {
                    Position = 2400,
                    Title = _localizer["Mario_Blog_Title"],
                    Content = _localizer["Mario_Blog_Description"]
                },
                new PortfolioInformation
                {
                    Position = 2800,
                    Title = _localizer["Mario_Connect_Title"],
                    Content = _localizer["Mario_Connect_Description"]
                },
            };

            List<string> progressList = new List<string>
            {
                _localizer["Mario_Progress_StartJourney"],
                _localizer["Mario_Progress_GettingStarted"],
                _localizer["Mario_Progress_LearnMore"],
                _localizer["Mario_Progress_ExploreProjects"],
                _localizer["Mario_Progress_AlmostDone"],
                _localizer["Mario_Progress_JourneyComplete"],
            };


            var marioPortfolioInformation = new MarioPortfolioInformation
            {
                ProgressTexts = progressList,
                ContentSections = portfolioInformation,
                ControlsDescription = _localizer["Mario_Controls_Description"]
            };

            return Ok(marioPortfolioInformation);
        }
    }
}
