using Microsoft.AspNetCore.SignalR;

namespace HomeScreen.Server.Screen;

public class ScreenHub: Hub<IScreenHubClient>
{
    private readonly ILogger<ScreenHub> _logger;

    public ScreenHub(ILogger<ScreenHub> logger)
    {
        _logger = logger;
    }
    public async Task SendMessage(object message) => await Clients.All.SendMessage(message);

    public override Task OnConnectedAsync()
    {
        _logger.LogDebug("Connected {ContextConnectionId}", Context.ConnectionId);
        return base.OnConnectedAsync();
    }
}

public interface IScreenHubClient
{
    Task SendMessage(object message);
}