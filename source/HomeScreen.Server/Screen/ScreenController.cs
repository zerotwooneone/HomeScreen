using Microsoft.AspNetCore.Mvc;

namespace HomeScreen.Server.Screen;

[ApiController]
[Route("api/[controller]")]
public class ScreenController : ControllerBase
{
    private readonly ILogger<ScreenController> _logger;
    private readonly IScreenService _screenService;

    public ScreenController(
        ILogger<ScreenController> logger, 
        IScreenService screenService)
    {
        _logger = logger;
        _screenService = screenService;
    }
    [HttpPost]
    public async Task<ActionResult> SetImage([FromBody] SetImageModel? obj)
    {
        if (obj is null || obj.SlideShow is null )
        {
            return BadRequest("slideShow is required");
        }

        const int arbitraryMax=1000;
        if (obj.SlideShow.Length>arbitraryMax || obj.SlideShow.Any(x => x.Length > arbitraryMax))
        {
            return BadRequest("invalid slideshow");
        }
        string[] urls = obj.SlideShow
            .Select(x => x.Trim())
            .Where(u => !string.IsNullOrWhiteSpace(u)).ToArray();
        if(urls.Length == 0)
        {
            return NoContent();
        }
        
        _logger.LogDebug("set image {obj}", obj);
        if (urls.Length == 1)
        {
            await _screenService.SetImageUrl(urls[0]);
        }
        else
        {
            await _screenService.SetSlideshow(urls);
        }
        
        return NoContent();
    }
    public class SetImageModel
    {
        public string[]? SlideShow { get; set; }
    }
}

