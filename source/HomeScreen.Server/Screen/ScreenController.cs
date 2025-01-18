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
    public async Task<ActionResult> SetImage([FromBody] SetImageModel obj)
    {
        if (string.IsNullOrWhiteSpace(obj.Url.Trim()) && string.IsNullOrWhiteSpace(obj.DataUrl.Trim()))
        {
            return BadRequest();
        }
        _logger.LogDebug("set image {obj}", obj);
        if (!string.IsNullOrWhiteSpace(obj.Url))
        {
            await _screenService.SetImageUrl(obj.Url);
        }else if (!string.IsNullOrWhiteSpace(obj.DataUrl))
        {
            await _screenService.SetImageData(obj.DataUrl);
        }
        
        return NoContent();
    }
    public class SetImageModel
    {
        public string Url { get; set; }="";
        public string DataUrl { get; set; }="";
    }
}

