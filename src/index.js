const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const handlebars = require('express-handlebars')

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes')
const db = require('./config/db')

// Connect to DB
db.connect()

const app = express()
const port = 3000



app.use(cors())

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))  

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json())

app.use(methodOverride('_method'))

// Custom middlewares
app.use(SortMiddleware)

// XMLHttpRequest, fetch, axios, ajax ...

// HTTP logger
//app.use(morgan('combined'))

// Template engine

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true,
        },
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }

                const icon = icons[sortType]
                const type = types[sortType]

                return `
                <a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>
                `

            }
        }
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app)

// Routes init
// app.get('/', (req, res) => {
//     res.render('home')
// })

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
