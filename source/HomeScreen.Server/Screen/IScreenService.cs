namespace HomeScreen.Server.Screen;

public interface IScreenService
{
    Task SetImageUrl(string url, CancellationToken cancellationToken=default);
    Task SetImageData(string dataUrl, CancellationToken cancellationToken=default); 
}