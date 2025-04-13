'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  src: string;
  showWaveform?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  className?: string;
  onEnded?: () => void;
  waveColor?: string;
  progressColor?: string;
}

export function AudioPlayer({
  src,
  showWaveform = false,
  autoPlay = false,
  loop = false,
  className = '',
  onEnded,
  waveColor = '#d4d4d8',
  progressColor = '#a855f7',
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const waveformDataRef = useRef<number[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  // Загрузка аудио и получение данных для визуализации
  useEffect(() => {
    if (!src) {
      setAudioError(true);
      return;
    }

    // Сбрасываем состояния при изменении источника
    setIsLoaded(false);
    setAudioError(false);
    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(false);

    let retryCount = 0;
    const maxRetries = 5;
    let retryTimer: ReturnType<typeof setTimeout>;

    const loadAudio = () => {
      // Добавляем параметр для обхода кэша при повторных загрузках
      const currentSrc =
        retryCount > 0 && !src.includes('?') ? `${src}?_retry=${retryCount}&t=${Date.now()}` : src;

      console.log(`Попытка загрузки аудио: ${currentSrc}, попытка ${retryCount + 1}/${maxRetries}`);

      if (audioRef.current) {
        audioRef.current.src = currentSrc;
        audioRef.current.load();
      }
    };

    loadAudio();

    if (showWaveform) {
      generateWaveformData();
    }

    // Настраиваем прогрессивную задержку для повторных попыток загрузки
    const setupRetry = () => {
      if (retryCount < maxRetries) {
        // Увеличиваем время ожидания с каждой попыткой (экспоненциальная задержка)
        const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
        console.log(`Запланирована повторная попытка через ${delay}мс`);

        retryTimer = setTimeout(() => {
          retryCount++;
          loadAudio();
        }, delay);
      } else {
        console.error(`Исчерпаны все попытки загрузки аудио: ${src}`);
      }
    };

    return () => {
      clearTimeout(retryTimer);
    };
  }, [src, showWaveform]);

  // Обработка событий аудио
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let hasError = false;
    let retryTimer: ReturnType<typeof setTimeout>;
    let retryCount = 0;
    const maxRetries = 3;

    const handleLoadedMetadata = () => {
      console.log(`Аудио успешно загружено: ${src}, длительность: ${audio.duration}с`);
      setDuration(audio.duration);
      setIsLoaded(true);
      setAudioError(false);
      hasError = false;
      if (autoPlay) {
        audio.play().catch((e) => {
          console.error('Ошибка автовоспроизведения:', e);
        });
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      if (onEnded) onEnded();
    };

    const handleError = (e: Event) => {
      console.error(`Ошибка загрузки аудио: ${src}`, e);
      setAudioError(true);
      setIsLoaded(false);
      setIsPlaying(false);
      hasError = true;

      // Проверяем доступность сети
      if (navigator.onLine) {
        // Пробуем подгрузить с добавлением временной метки для обхода кэша
        if (retryCount < maxRetries) {
          retryCount++;
          // Увеличиваем время ожидания с каждой попыткой (экспоненциальная задержка)
          const delay = Math.min(1000 * Math.pow(1.5, retryCount), 5000);

          console.log(
            `Ошибка загрузки, повторная попытка ${retryCount}/${maxRetries} через ${delay}мс`,
          );

          retryTimer = setTimeout(() => {
            const newSrc = src.includes('?')
              ? `${src.split('?')[0]}?_retry=${retryCount}&t=${Date.now()}`
              : `${src}?_retry=${retryCount}&t=${Date.now()}`;

            console.log('Пробуем загрузить аудио с новым URL для обхода кэша:', newSrc);
            audio.src = newSrc;
            audio.load();
          }, delay);
        } else {
          console.error(`Все попытки загрузки аудио исчерпаны: ${src}`);
        }
      } else {
        console.warn('Отсутствует подключение к сети. Невозможно загрузить аудио.');
      }
    };

    const handleCanPlay = () => {
      console.log(`Аудио может быть воспроизведено: ${src}`);
      setAudioError(false);
      retryCount = 0; // Сбрасываем счетчик повторных попыток при успешной загрузке
    };

    const handleAbort = () => {
      console.warn(`Загрузка аудио прервана: ${src}`);
      if (!hasError && !isLoaded) {
        // Если загрузка прервана, но нет явной ошибки, пробуем еще раз
        setTimeout(() => {
          if (audioRef.current && !isLoaded && !hasError) {
            console.log('Перезагрузка после прерывания...');
            audioRef.current.load();
          }
        }, 500);
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('abort', handleAbort);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('abort', handleAbort);

      clearTimeout(retryTimer);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoPlay, onEnded, src, isLoaded]);

  // Генерация данных для волновой формы
  const generateWaveformData = async () => {
    try {
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const channelData = audioBuffer.getChannelData(0);
      const samples = 100; // Количество точек для визуализации
      const blockSize = Math.floor(channelData.length / samples);
      const waveform = [];

      for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(channelData[blockStart + j] || 0);
        }
        waveform.push(sum / blockSize);
      }

      // Нормализация значений от 0 до 1
      const multiplier = 1.0 / Math.max(...waveform);
      waveformDataRef.current = waveform.map((n) => n * multiplier);

      drawWaveform();
    } catch (err) {
      console.error('Ошибка при создании волновой формы:', err);
    }
  };

  // Отрисовка волновой формы
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas || waveformDataRef.current.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const barWidth = width / waveformDataRef.current.length;
    const gap = 2;

    ctx.clearRect(0, 0, width, height);

    // Рисуем волновую форму
    waveformDataRef.current.forEach((value, index) => {
      const x = index * barWidth;
      const barHeight = value * height * 0.8;

      // Отрисовка прогресса
      const progressPosition = (progress / 100) * width;

      // Выбор цвета в зависимости от позиции прогресса
      ctx.fillStyle = x < progressPosition ? progressColor : waveColor;

      // Рисуем столбик
      ctx.fillRect(x + gap / 2, height - barHeight, barWidth - gap, barHeight);
    });
  };

  // Анимация волновой формы при воспроизведении
  useEffect(() => {
    if (isPlaying && showWaveform) {
      const animate = () => {
        drawWaveform();
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      if (showWaveform) drawWaveform();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, progress, showWaveform]);

  // Обновление размера canvas при изменении окна
  useEffect(() => {
    const handleResize = () => {
      if (showWaveform) {
        drawWaveform();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showWaveform]);

  // Переключение воспроизведения
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (src && !audioError) {
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error('Ошибка воспроизведения:', error);

            // При ошибке воспроизведения пробуем перезагрузить аудио
            if (audioRef.current) {
              console.log('Перезагрузка аудио после ошибки воспроизведения');

              // Проверяем источник на наличие временной метки
              const currentSrc = audioRef.current.src;
              const baseSrc = currentSrc.includes('?') ? currentSrc.split('?')[0] : currentSrc;
              const newSrc = `${baseSrc}?_play=${Date.now()}`;

              // Перед установкой нового источника ставим на паузу
              audioRef.current.pause();
              audioRef.current.src = newSrc;
              audioRef.current.load();

              // Повторная попытка воспроизведения после небольшой задержки
              setTimeout(() => {
                if (audioRef.current && !audioError) {
                  audioRef.current.play().catch((e) => {
                    console.error('Ошибка при повторной попытке воспроизведения:', e);
                    setAudioError(true);
                  });
                }
              }, 500);
            }
          });
        }
      }
    }

    setIsPlaying(!isPlaying);
  };

  // Изменение позиции воспроизведения
  const handleProgressChange = (newValue: number[]) => {
    if (!audioRef.current || !isLoaded) return;

    const newProgress = newValue[0];
    const newTime = (duration / 100) * newProgress;

    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  // Изменение громкости
  const handleVolumeChange = (newValue: number[]) => {
    if (!audioRef.current) return;

    const newVolume = newValue[0];
    audioRef.current.volume = newVolume / 100;
    setVolume(newVolume / 100);

    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Переключение звука
  const toggleMute = () => {
    if (!audioRef.current) return;

    const newMuteState = !isMuted;
    audioRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
  };

  // Форматирование времени
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Обработчик нажатия на прогресс-бар
  const handleProgressClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!audioRef.current || !isLoaded) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    const newTime = percentage * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Вычисление процента прогресса
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn('rounded-lg bg-background p-3', className)}>
      <audio ref={audioRef} src={src} preload="metadata" loop={loop} />

      {audioError && <div className="mb-2 text-sm text-red-500">Ошибка воспроизведения</div>}

      {showWaveform && (
        <div className="mb-2 h-20 w-full">
          <canvas
            ref={canvasRef}
            className="h-full w-full cursor-pointer"
            onClick={handleProgressClick}
          />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={togglePlay}
            disabled={!isLoaded || audioError}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>

          <div className="ml-1 w-20">
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              min={0}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="h-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      {!showWaveform && (
        <div className="mt-2">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleProgressChange}
            disabled={!isLoaded || audioError}
            className="h-1"
          />
        </div>
      )}
    </div>
  );
}
