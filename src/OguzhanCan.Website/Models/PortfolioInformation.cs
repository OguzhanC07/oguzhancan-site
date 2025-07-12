namespace OguzhanCan.Website.Models
{
    public class PortfolioInformation
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? InternalDescription { get; set; }
    }

    public class MarioPortfolioInformation : PortfolioInformation
    {
        public int Position { get; set; }
    }
}
