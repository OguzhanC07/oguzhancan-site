namespace OguzhanCan.Website.Models
{
    public class ClassicPortfolioInformation
    {
        public PortfolioInformation? AboutMe { get; set; }
        public List<PortfolioInformation>? Projects { get; set; }
        public List<PortfolioInformation>? BlogPosts { get; set; }
        public List<PortfolioInformation>? ContactInformation { get; set; }
    }
}
