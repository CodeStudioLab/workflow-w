<p align="center">
  <img width="150" height="150" src="https://res.cloudinary.com/yormian/image/upload/v1612128128/logo-cs.png">
</p>

# Workflow Webpack

> Pasos para crear un ***Worrkflow*** para el el ***FrontEnd*** con ***Webpack***

### Paso 1

Crear una carpeta con el nombre que de su preferencia en minúscula y sin espacios 

```
mkdir tu-nombre
cd workflow-w
```

### Paso 2

Inicializar  Node  

```
npm init -y
```

### Paso 3

instalamos Webpack 

```
npm install webpack webpack-cli --save-dev
```

### Paso 4

Crear un directorio de desarrollo de nombre ***src*** este directorio alojará los ***source*** para el desarrollo, con la siguiente estructura,

```
/src
	|-/img
	|-/js
		|-main.js
	|-/scss
		|-main.scss
	|-index.html
```

### Paso 5

Crear un directorio con el nombre  ***config*** , este alojará los archivos de configuración para ***webpack.*** dentro de ***config*** crear 3 archivos con los siguientes nombre `webpack.common`  `webpack.dev.js`  `webpack.prod.js`.

```
/config
	|-webpack.common.js
	|-webpack.dev.js
	|-webpack.prod.js
```

### Nota:

A continuación veras como se construye un archivos de configuración, un objeto de **webpack** el cual para el archivo ****`webpack.common` 

**Entrada (entry)**:  Elegimos nuestro archivo `main.js` ubicado en `src/js/main.js`
**Salida (output)**:  En esta salida deja el archivo `main.builder.js`, en la carpeta JS en el directorio `./public`

```jsx
//en esta parte sé instancia los plugins a usar
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// En entry agregamos el punto de entrada
entry: './src/js/main.js',
output: {
	  filename: 'js/[name].js',
	  path: path.resolve(__dirname, '../public'),
  },

module.exports = {

	/* 
	*  Para hacer uso delos los loaders, en la propiedad module que es 
	*	 un objeto dentro creamos un arreglo de nombre rules y  dentro de rules, 
  *  creamos objetos, cada uno de estos objeto será una configuración para los 
  *  tipos de archivos que queremos cargar. 
  */
	module: {
		rules: [
		 //Ejemplo
				{
				  	test:/\.js$/,
						exclude: /node_modules/,
				  	use: { loader:"babel-loader"}
				},
		]
	},
	
	/* 
  *  Para hacer usos de los plugins, creamos un arrelo, 
	*	 dentro de plugins creamos una instancia del plugins
  *  que estamos usando.
  */
	plugins: [
		//Ejemplo
		new HtmlWebpackPlugin({})
	],
}
```

A continuación veras como se construye un archivos de configuración, un objeto de **webpack** el cual para el archivo ****`webpack.dev.js webpack.prod.js`

```jsx
//en esta parte sé instancia los plugins a usar
const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
		// mode definos development o production
  	mode: '',
  	devtool: 'inline-source-map',
  	

  	module: {
		rules: [
		  // Objetos
		]
	},
});
```

## Ejmeplos

Configuración Común `webpack.common.js`

```jsx
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Este es nuestro archivo de entrada
  entry: './src/js/main.js',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
		title: 'Webpack',
		template: './src/index.html',
		filename: 'index.html',
		minify: false
	}),
	new MiniCssExtractPlugin({
		filename: './css/[name].css',
	}),
  ],

  module: {
	  rules: [
		{
			  	test:/\.js$/,
				exclude: /node_modules/,
			  	use: { loader:"babel-loader"}
		},
		{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					 	name: '[name].[ext]',
						outputPath: './img',
						publicPath: 'img',
						emitFile: true,
						esModule: false,
				}
		},
	  ],
  },

  /*En esta salida  deja el archivo
  * main.builder.js,  en la carpeta JS
  * en el directorio ./public
  */
  output: {
	  filename: 'js/[name].js',
	  path: path.resolve(__dirname, '../public'),
  },
};
```

Configuración Modo ***Development*** `webpack.dev.js`

```jsx
const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  	mode: 'development',
  	devtool: 'inline-source-map',
  	devServer: {
		contentBase: path.resolve(__dirname, './public'),
		port: 8080,
		hot: true,
		open: true,
  	},

  	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{ loader: "style-loader" },
          			{ loader: "css-loader", options: { sourceMap: true } },
          			{ loader: "postcss-loader", options: { sourceMap: true } },
          			{ loader: "sass-loader", options: { sourceMap: true } },
				]
			}
		]
	},
});
```

Configuración Modo Production `webpack.prod.js`

```jsx
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  	mode: 'production',
  	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader',
				]
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
	]
});
```

### Paso 6

***Webpack Marge,*** en un modulo que ******permite unir distinto tipos de configuraciones en nuestro caso `dev` y `prod` [*Documentación Webpack Marge](https://webpack.js.org/guides/production/)* 

```
npm install --save-dev webpack-merge
```

```
clean-webpack-plugin
```

## Nota:

A continuación instalaremos las siguientes dependencia de desarrollo, ***Loaders*** y ***Plugins***, los mismo permitirán ***compilar, minificar, preprocesar y traspilar:*** `.html, .pug, .css, .scss, .js, .png, jpg, .svg, .gif, .js`

### Paso 7

**HTML Webpack Plugin**: Instalar el plugin `html-webpack-plugin` con esto se puede crear template, minificar el `HTML` 

```
npm install --save-dev html-webpack-plugin
```

Configuración Global en el archivo `webpack.common.js` dentro de `plugins: [...]` [Documentación Clean Webpack Plugins](https://github.com/johnagan/clean-webpack-plugin)  [Configuración](https://github.com/jantimon/html-webpack-plugin) 

```jsx
plugins: [
	new HtmlWebpackPlugin({
			title: 'Webpack',
			template: './src/index.html',
			filename: 'index.html',
			minify: false
	}),
]
```

### Paso 8

**Styles Loader, CSS, PostCSS, SASS**:  Instalar los siguientes `loaders,Plugins y packags` .  

```
npm install --save-dev node-sass mini-css-extract-plugin style-loader css-loader
sass-loader postcss postcss-loader postcss-preset-env
```

Crear un archivo `postcss.config.js` en la raíz del proyecto, con esto se agregan prefijos al css si la propiedad los necesita, asi eliminamos errores al colocarlo nosotros 

```jsx
module.exports  = {
	plugins: {
		"postcss-preset-env": {
			browsers: "last 2 versions",
		},
		"autoprefixer": true,
	}
}
```

Configuración en el archivo `webpack.dev.js` dentro de  `module: { rules: [...] }` . Con esto Pre-Procesara los archivos **SASS** a **CSS** añadirá prefijos e inyectara al navegador los estilos css en modo desarrollo.

```jsx
module: {
	rules: [
		{
			test: /\.(sa|sc|c)ss$/,
			use: [
				{ loader: "style-loader" },
				{ loader: "css-loader", options: { sourceMap: true } },
				{ loader: "postcss-loader", options: { sourceMap: true } },
				{ loader: "sass-loader", options: { sourceMap: true } },
			]
		}
	}
}
```

Configuración en el archivo `webpack.prod.js` dentro de  `module: { rules: [...] }` . Con esto Pre-Procesara los archivos **SASS** a **CSS** añadirá prefijos y con `mini-css-extract-plugin` minificara e inyectara el CSS al HTML

```jsx
module: {
	rules: [
		{
			test: /\.(sa|sc|c)ss$/,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader',
				'sass-loader',
			]
		},
	]
}
```

### Paso 9

**Babel JS:** instalar las dependencias de babel. Con este `Loader` se podrá trabajar con `Javascript` moderno, Transpilar. 

```jsx
npm install --save-dev babel-loader @babel/core @babel/preset-env 
```

**plugin-syntax-dynamic-import**: ****para hacer imports dinámicos y Code Splitting

```jsx
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

3- Para `preset-env` crear un archivo `.babelrc` en plugins hacemos uso de `plugin-syntax-dynamic-import`

```jsx
 {
	"presets": [
	  	[
				"@babel/preset-env",
				{
					"modules": false
				}
	  	]
	],
	"plugins": ["@babel/plugin-syntax-dynamic-import"]
  }
```

Configuración Global en el archivo `webpack.common.js` dentro de  `module: { rules: [...] }`

```jsx
module: {
	rules: [
		{
		  	test:/\.js$/,
				exclude: /node_modules/,
		  	use: { loader:"babel-loader"}
		},
	]
}
```

### Paso 10

**file-loader:**  para cargar imágenes 

```
npm install file-loader --save-dev
```

Configuración Global en el archivo `webpack.common.js` dentro de  `module: { rules: [...] }`

```jsx
module: {
	rules: [
		{
			test: /\.(png|jpe?g|gif|svg)$/i,
			loader: 'file-loader',
			options: {
				 	name: '[name].[ext]',
					outputPath: './img',
					publicPath: 'img',
					emitFile: true,
					esModule: false,
				}
			},
	]
}
```

### Paso 11

***DevServer**:* nos permitirá crear un servidor y servir nuestro `HTML` en el navegador, refrescar los cambios.  ****

```
npm install webpack-dev-server --save-dev
```

Configuración en el archivo `webpack.prod.js`

```jsx
devServer: {
		contentBase: path.resolve(__dirname, './public'),
		port: 8080,
		hot: true,
		open: true,
},
```

### Paso 12

 Agregar el siguiente scripts en `package.json`

```json
"scripts": {
    "start": "webpack serve --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.prod.js"
  },
```

Una vez completado todos estos paso solo queda corre los siguientes comando

Comando para desarrollo  

**`npm run dev`**

Comando para producción   

**`npm run build`**