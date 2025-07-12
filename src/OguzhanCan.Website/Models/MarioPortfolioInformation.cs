namespace OguzhanCan.Website.Models
{

    public class MarioPortfolioInformation : PortfolioInformation
    {
        public List<PortfolioInformation> ContentSections { get; set; } = new List<PortfolioInformation>();
        public List<string> ProgressTexts { get; set; } = new List<string>();
    }
}
