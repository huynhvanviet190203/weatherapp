
const APP_ID = '43cc3f53bee93bcfe251e9cad15c3378';
const DEFAULT_VALUE = '--';
const searchInput = document.querySelector('#search-input');

const cityname = document.querySelector('.city-name');
const weatherstate = document.querySelector('.weather-state');
const weathericon = document.querySelector('.weather-icon');
const weathertemperature = document.querySelector('.temperature');

const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')

searchInput.addEventListener('change', (e) => {
    console.log('[SearchInput]', e)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log('[Search Input]', data);
            cityname.innerHTML = data.name || DEFAULT_VALUE;
            weatherstate.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            weathericon.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
            weathertemperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;

            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = (data.main.humidity || DEFAULT_VALUE) + '%';
            wind.innerHTML = (data.wind.speed*3.6).toFixed(2) || DEFAULT_VALUE;



        });
        
        
        // Trợ lí ảo

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

        const recognition = new SpeechRecognition();

        recognition.lang = 'vi-VI';
        recognition.continuous = false;
        // thêm event cho mic

        const microphone = document.querySelector('.microphone');

        microphone.addEventListener('click', (e) => {
            e.preventDefault();

            recognition.start();

        });

        recognition.onspeechend = () =>{
            recognition.stop();
        }

        recognition.onerror = (err) => {
            console.error('Speech recognition error:', err);
        
            switch (err.error) {
                case 'network':
                    alert('Có vấn đề với kết nối mạng. Vui lòng kiểm tra kết nối Internet của bạn và thử lại.');
                    break;
                // Xử lý các loại lỗi khác...
                default:
                    alert(`Lỗi không xác định: ${err.error}. Vui lòng thử lại.`);
            }
        };

        recognition.onresult = (e) =>{
            console.log('onresult',e);
            }

});