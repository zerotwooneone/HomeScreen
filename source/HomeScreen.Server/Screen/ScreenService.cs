using Microsoft.AspNetCore.SignalR;
using R3;

namespace HomeScreen.Server.Screen;

public class ScreenService: IScreenService
{
    private readonly ILogger<ScreenService> _logger;
    private readonly IHubContext<ScreenHub> _screenHubContext;

    public ScreenService(ILogger<ScreenService> logger,
        IHubContext<ScreenHub> screenHubContext)
    {
        _logger = logger;
        _screenHubContext = screenHubContext;
    }
    public async Task SetImage(string url,CancellationToken cancellationToken)
    {
        await _screenHubContext.Clients.All.SendAsync("SendMessage",url,cancellationToken);
    }
}