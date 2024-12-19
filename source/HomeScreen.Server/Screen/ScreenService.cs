using Microsoft.AspNetCore.SignalR;
using R3;

namespace HomeScreen.Server.Screen;

public class ScreenService: IHostedService
{
    private readonly ILogger<ScreenService> _logger;
    private readonly IHubContext<ScreenHub> _screenHubContext;
    private readonly ITimeProvider _timeProvider;
    private IDisposable? _lifetimeDisposable;

    public ScreenService(ILogger<ScreenService> logger,
        IHubContext<ScreenHub> screenHubContext,
        ITimeProvider timeProvider)
    {
        _logger = logger;
        _screenHubContext = screenHubContext;
        _timeProvider = timeProvider;
    }
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        var interval = Observable.Interval(TimeSpan.FromSeconds(2),_timeProvider.GetDefault());
        bool flipFlop = false;
        _lifetimeDisposable =interval.SubscribeAwait(async (_, c)=>
        {
            flipFlop = !flipFlop;
            var value = flipFlop ? 1 : 0;
            await _screenHubContext.Clients.All.SendAsync("SendMessage","test",c);
        });
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        _lifetimeDisposable?.Dispose();
    }
}