using HomeScreen.Server.Screen;
using Microsoft.AspNetCore.SignalR;

namespace HomeScreen.Server;

public class ScreenHubFactory : IScreenHubFactory
{
    private readonly IServiceProvider _serviceProvider;
    public ScreenHubFactory(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }
    public IHubContext<ScreenHub> Create()
    {
        return _serviceProvider.GetRequiredService<IHubContext<ScreenHub>>();
    }
}