# PrettifyMyPower

Frontend aplikacji StealMyPower napisany w technologii React Native z użyciem Expo. Aplikacja do poprawnego działania wymaga serwera, który znajduje się w innym repozytorium.

## Co zrobić przed uruchomieniem?

Przede wszystkim sprawdzić, czy w pliku `constants/serverAddress.js` wpisany jest prawidłowy adres IP serwera.

## A co jeśli tylko niektóre funkcje działają?

Przede wszystkim można wejść w pliki znajdujące się w folderze `actions/` i w funkcji `fetchWithTimeout` zdefiniowanej w każdym z plików zwiększyć timeout. Okazuje sięto szczególnie pomocne w miejscach, gdy serwer musi porozumiewać się z mockami miejsc parkingowych, co wydłuża proces oczekiwania na odpowiedź niezwykle znacząco.
