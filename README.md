# Historia USaP Trainer

Web app euskaraz para practicar Historia USaP/PAU, lista para Vercel y empaquetada con Capacitor para Android.

## Modos

- `Sele modua`: simulacro con A1 akatsak y A2 orden cronologico.
- `Testuak ikasi`: textos 13-24 con conceptos peligrosos subrayados.
- `Akatsak praktikatu`: 5 akats, clic en el fallo y correccion escrita, maximo 2 puntos.
- `Gertakariak ikasi`: cronologia por temas con anos.
- `Ordenatu praktikatu`: ordenar 5 gertakariak arrastrando, maximo 1 punto.
- `Emaitzak`: dominio, rachas y proximos repasos.

## Progreso

No hay login, cuenta ni Supabase. La app guarda todo en el dispositivo:

- `localStorage` principal.
- copia espejo local por seguridad.
- intento de `persistent storage` del navegador.
- boton `Babeskopia` para exportar JSON.
- boton `Inportatu` para recuperar una copia.

Importante: si el usuario borra los datos del navegador o desinstala la app movil, el sistema operativo puede eliminar el progreso. Para evitarlo, conviene exportar una babeskopia de vez en cuando.

## Desarrollo

```bash
npm install
npm run dev
```

## Vercel

El proyecto usa `output: 'export'`, asi que `npm run build` genera la version estatica en `out/`.

En Vercel:

1. Sube este directorio a GitHub.
2. Importa el repo en Vercel.
3. Build command: `npm run build`.
4. No hacen falta variables de entorno.

## Android / Capacitor

El proyecto Android esta en `android/`.

Sincronizar assets:

```bash
npm run cap:sync
```

Generar AAB en Windows:

```bash
$env:JAVA_HOME='C:\Program Files\Android\Android Studio\jbr'
$env:ANDROID_HOME='C:\Users\aitor\AppData\Local\Android\Sdk'
$env:ANDROID_SDK_ROOT=$env:ANDROID_HOME
$env:Path="$env:JAVA_HOME\bin;$env:ANDROID_HOME\platform-tools;$env:Path"
npm run android:aab
```

Salida generada:

```text
android/app/build/outputs/bundle/release/app-release.aab
```

Para Google Play normalmente tendras que configurar una firma release propia.

## Contenido

El banco inicial se genera desde los apuntes con:

```bash
python scripts/generate_content.py
```

El contenido final queda en `lib/content.ts`.
