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
                    Title = "Welcome!",
                    Content = "<p>Hello! I'm <strong>Oguzhan Can</strong>, a passionate developer ready to take on new challenges!</p>" + Environment.NewLine + "<p>Move Mario to the right to start exploring my professional journey!</p>"
                },
                new PortfolioInformation
                {
                    Position = 400,
                    Title = "👨‍💻 About Me",
                    Content = @$"<p><strong>Location:</strong> Mushroom Kingdom (Remote)</p>
                         <p><strong>Email:</strong><a href='mailto:hello@oguzhancan.com'>hello@oguzhancan.com</a></p>
                         <p><strong>Experience:</strong> {DateTime.Now.Year - 2021}+ years in various technologies such as power apps, .net, mssql</p>
                         <p>I'm a passionate developer who loves creating interactive experiences and solving complex problems. Just like Mario collects coins, I collect new skills and technologies!</p>"
                },
                new PortfolioInformation
                {
                    Position = 800,
                    Title = "🛠️ Skills & Technologies",
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
                         <h3>Tools & Others</h3>
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
                                <p><strong>Omerd Business Solutions.(2022 - Present)</strong></p>
                                <p>Lead development of scalable applications, mentor junior developers, implement modern practices.</p>
                         </div>
                         <div class=""project-item"">
                             <h3>Junior Software Test Engineer</h3>
                             <p><strong>FileOrbis (2021 - 2022)</strong></p>
                             <p>I developed over 2,000 automated UI tests for the FileOrbis system using the .NET framework, also created load tests for fileorbis system.</p>
                         </div>"
                },
                new PortfolioInformation
                {
                    Position = 2000,
                    Title = "🌟 Recent Projects",
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
                    Position = 2400,
                    Title = "📝 Blog & Writing",
                    Content = @$"<p><strong>Coming Soon!</strong> 🚧</p>
                         <p>I'm preparing awesome content about:</p>
                         <ul style=""margin: 10px 0; padding-left: 20px;"">
                             <li>Blog post 1</li>
                             <li>Blog Post 2</li>
                         </ul>"
                },
                new PortfolioInformation
                {
                    Position = 2800,
                    Title = "🎯 Let's Connect!",
                    Content = @$"<p><strong>Ready to work together?</strong></p>
                         <p>I'm always excited to take on new challenges and collaborate on innovative projects!</p>
                         <p><strong>Contact:</strong><a href=""mailto:hello@oguzhancan.com"">hello@oguzhancan.com</a></p>
                         <p><strong>LinkedIn:</strong> <a href=""https://www.linkedin.com/in/oguzhan-can/""> /in/oguzhan-can/</a></p>
                         <p><strong>GitHub:</strong> <a href=""https://github.com/OguzhanC07""> /OguzhanC07</a> </p>
                         <p>Thanks for exploring my journey! 🎮✨</p>"
                },
            };

            List<string> progressList = new List<string>
            {
                "Start Journey",
                "Getting Started",
                "Learning More",
                "Exploring Projects",
                "Almost Done",
                "Journey Complete!"
            };


            var marioPortfolioInformation = new MarioPortfolioInformation
            {
                ProgressTexts = progressList,
                ContentSections = portfolioInformation
            };

            return Ok(marioPortfolioInformation);
        }
    }
}
