using Microsoft.AspNetCore.Mvc;

namespace HomeScreen.Server.Client;

[ApiController]
[Route("api/[controller]")]
public class ScreenController : ControllerBase
{
    private readonly ILogger<ScreenController> _logger;

    public ScreenController(ILogger<ScreenController> logger)
    {
        _logger = logger;
    }
    [HttpPost]
    public void SetImage([FromBody] SetImageModel obj)
    {
        _logger.LogWarning("set image {Url}", obj.Url);
    }
    
    public class SetImageModel
    {
        public string Url { get; set; }
    }
}

