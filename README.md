# Historia USaP Trainer

Web app euskaraz para practicar Historia USaP/PAU, lista para Vercel y empaquetada con Capacitor para Android.

## Modos

- `Sele modua`: simulacro con A1 akatsak y A2 orden cronologico.
- `Testuak ikasi`: textos 13-24 con conceptos peligrosos subrayados.
- `Akatsak praktikatu`: 5 akats, clic en el fallo y correccion escrita, maximo 2 puntos.
- `Gertakariak ikasi`: cronologia por temas con anos.
- `Ordenatu praktikatu`: ordenar 5 gertakariak arrastrando, maximo 1 punto.
- `Emaitzak`: dominio, rachas y proximos repasos.

## Progreso y Supabase

La app usa autenticacion suave por `erabiltzaile-izena`: solo se escribe un nombre de usuario, sin email ni contrasena. Ese nombre crea o abre un perfil en Supabase y sincroniza el progreso entre PC y movil.

Tambien mantiene una copia local:

- `localStorage` principal.
- copia espejo local por seguridad.
- intento de `persistent storage` del navegador.
- boton `Babeskopia` para exportar JSON.
- boton `Inportatu` para recuperar una copia.

Importante: como no hay contrasena, si otra persona usa exactamente el mismo nombre podria ver o modificar ese progreso. Usa un nombre suficientemente personal.

Para Supabase:

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/schema.sql` en el SQL editor.
3. Copia `.env.local.example` a `.env.local`.
4. Rellena:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Sin esas variables, la app funciona en modo local.

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
4. Anade en Project Settings las variables `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

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
