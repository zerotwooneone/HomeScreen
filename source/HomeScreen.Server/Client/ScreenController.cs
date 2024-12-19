using HomeScreen.Server.Screen;
using Microsoft.AspNetCore.Mvc;

namespace HomeScreen.Server.Client;

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
        if (string.IsNullOrWhiteSpace(obj.Url.Trim()))
        {
            return BadRequest();
        }
        _logger.LogDebug("set image {Url}", obj.Url);
        await _screenService.SetImage(obj.Url);
        return NoContent();
    }
    
    public class SetImageModel
    {
        public string Url { get; set; }="";
    }
}

