namespace OguzhanCan.Website.Models
{
    public class MarioPortfolioInformation
    {
        public List<PortfolioInformation> ContentSections { get; set; } = new List<PortfolioInformation>();
        public List<string> ProgressTexts { get; set; } = new List<string>();
        public string? ControlsDescription { get; set; }

    }
}
