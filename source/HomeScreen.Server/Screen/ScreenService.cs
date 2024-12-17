using Microsoft.AspNetCore.SignalR;
using R3;

namespace HomeScreen.Server.Screen;

public class ScreenService: IHostedService
{
    private readonly ILogger<ScreenService> _logger;
    private readonly IScreenHubFactory _screenHubFactory;
    private readonly ITimeProvider _timeProvider;
    private IDisposable? _lifetimeDisposable;

    public ScreenService(ILogger<ScreenService> logger,
        IScreenHubFactory screenHubFactory,
        ITimeProvider timeProvider)
    {
        _logger = logger;
        _screenHubFactory = screenHubFactory;
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
            await _screenHubFactory.Create().Clients.All.SendAsync("SendMessage","test",c);
        });
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        _lifetimeDisposable?.Dispose();
    }
}

public interface IScreenHubFactory 
{
    IHubContext<ScreenHub> Create();
}