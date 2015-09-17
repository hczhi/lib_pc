//开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'autoload');
// fis.config.set('settings.postpackager.simple.autoCombine', true);
// fis.config.set('settings.postpackager.simple.autoReflow', true);
fis.config.set('settings.postpackager.autoload.scriptTag', '<!--SCRIPT_PLACEHOLDER-->');
fis.config.set('settings.postpackager.autoload.styleTag', '<!--STYLE_PLACEHOLDER-->');
fis.config.set('settings.postpackager.autoload.resourceMapTag', '<!--RESOURCEMAP_PLACEHOLDER-->');
//将Less编译成CSS
fis.config.set('modules.parser.less', 'less');
fis.config.set('roadmap.ext.less', 'css');

//自动去除console.log等调试信息
fis.config.set('settings.optimizer.uglify-js', {
    compress : {
        drop_console: true
    }
});
//通过pack设置干预自动合并结果，将公用资源合并成一个文件，更加利于页面间的共用

//Step 2. 取消下面的注释开启pack人工干预
// fis.config.set('pack', {
//     'pkg/lib.js': [
//         '/lib/mod.js',
//         '/modules/underscore/**.js',
//         '/modules/backbone/**.js',
//         '/modules/jquery/**.js',
//         '/modules/vendor/**.js',
//         '/modules/common/**.js'
//     ]
// });

//Step 3. 取消下面的注释可以开启simple对零散资源的自动合并
// fis.config.set('settings.postpackager.simple.autoCombine', true);


// 为所有样式资源开启csssprites
fis.config.set('roadmap.path', [{
    reg: '**.css',
    useSprite: true
}]);
//设置csssprites的合并间距
fis.config.set('settings.spriter.csssprites.margin', 10);


//文件MD5戳长度
fis.config.set('project.md5Length', 8);

//设置项目源码文件include过滤器。只有命中include的文件才被视为源码，其他文件则忽略。
fis.config.set('project.include', ['pages/**','modules/**','common/**']);

fis.config.merge({
    deploy : {
        local : {
            //from参数省略，表示从发布后的根目录开始上传
            //发布到当前项目的dlist目录中
            to : './dlist'
        },
    },
    roadmap : {
        path : [
            {
                //css 图片文件
                reg : /^\/modules\/[^\/]+\/images\/([^\/]+\.(?:png|gif|jpg))$/,
                //url : 'images/$1',
                release : '/css/images/$1'
            },
            {
                //css 图片文件2
                reg : /^\/common\/css\/images\/([^\/]+\.(?:png|gif|jpg))$/,
                // url : 'images/$1',
                release : '/css/images/$1'
            },
            {
                //图片文件
                reg : /^\/modules\/[^\/]+\/([^\/]+\.(?:png|gif|jpg))$/,
                url : './testimages/$1',
                release : './testimages/$1'
            },
            {
                //图片文件2
                reg : /^\/pages\/[^\/]+\/([^\/]+\.(?:png|gif|jpg))$/,
                url : '/testimages/$1',
                release : './testimages/$1'
            },
            {
                reg : /^\/pages\/([^\/]+\.html)$/,
                useMap : true,
                release : '/$1'
            },
            {
                //dlist
                reg : /dlist\/.*/,
                //编译的时候不要产出了
                release : false
            },
            {
                //dlist
                reg : /.git\/.*/,
                //编译的时候不要产出了
                release : false
            }
        ],
        domain : {
            'js/**.js' : '.',
            'css/**.css': '.'
        }
    },
    pack : {
       'css/base.css': [
            '/common/css/reset.less',
            '/common/css/base.less'
        ],
        'css/calendar.css': [
            '/modules/calendar/calendar.less'
        ],
        'css/banner_m.css': [
            '/modules/banner_m/banner_m.less'
        ],
        'css/scratch_card.css': [
            '/modules/scratch_card/scratch_card.less'
        ],
        'js/jq.js': [
            '/common/js/jquery-1.11.2.min.js'
        ],
        'js/zepto.js': [
            '/common/js/zepto.js'
        ],
        'js/touch.js': [
            '/common/js/touch.js'
        ],
        'js/base.js': [
            '/common/js/base.js'
        ],
        'js/calendar.js': [
            '/modules/calendar/calendar.js'
        ],
         'js/banner_m.js': [
            '/modules/banner_m/banner_m.js'
        ],
         'js/scratch_card.js': [
            '/modules/scratch_card/scratch_card.js'
        ]
    }
});







































