# Apache HTTP Server 基础配置说明

## 一、配置文件结构

### 主要配置文件

```
/etc/apache2/             # Debian/Ubuntu
├── apache2.conf          # 主配置文件
├── ports.conf            # 监听端口配置
├── sites-available/      # 可用站点配置
│   ├── 000-default.conf
│   └── example.com.conf
├── sites-enabled/        # 启用的站点（符号链接）
├── mods-available/       # 可用模块
└── mods-enabled/         # 启用的模块

/usr/local/apache2/conf/ # 源码编译安装默认路径
├── httpd.conf           # 主配置文件
├── extra/               # 额外配置文件
└── vhosts/              # 虚拟主机配置
```

## 二、核心配置指令

### 1. 基本配置
```apache
# 服务器根目录
ServerRoot "/etc/apache2"

# 监听端口
Listen 80
Listen 443

# 服务器管理员邮箱
ServerAdmin webmaster@localhost

# 服务器名称（域名）
ServerName www.example.com:80
```

### 2. 主服务器配置
```apache
# 文档根目录
DocumentRoot "/var/www/html"

# 目录访问控制
<Directory "/var/www/html">
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
</Directory>

# 文件访问控制
<Files ".ht*">
    Require all denied
</Files>
```

### 3. 日志配置
```apache
# 错误日志
ErrorLog ${APACHE_LOG_DIR}/error.log
LogLevel warn

# 访问日志
LogFormat "%h %l %u %t \"%r\" %>s %b" common
CustomLog ${APACHE_LOG_DIR}/access.log combined
```

## 三、虚拟主机配置

### 1. 基于IP的虚拟主机
```apache
<VirtualHost 192.168.1.100:80>
    ServerAdmin admin@site1.com
    DocumentRoot "/var/www/site1"
    ServerName site1.com
    ErrorLog "logs/site1-error.log"
    CustomLog "logs/site1-access.log" common
</VirtualHost>
```

### 2. 基于域名的虚拟主机
```apache
<VirtualHost *:80>
    ServerName www.example.com
    ServerAlias example.com *.example.com
    DocumentRoot "/var/www/example"
    
    <Directory "/var/www/example">
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

<VirtualHost *:80>
    ServerName blog.example.com
    DocumentRoot "/var/www/blog"
</VirtualHost>
```

### 3. SSL虚拟主机
```apache
<VirtualHost *:443>
    ServerName secure.example.com
    DocumentRoot "/var/www/secure"
    
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/ssl-cert-snakeoil.pem
    SSLCertificateKeyFile /etc/ssl/private/ssl-cert-snakeoil.key
    
    # 强制HTTPS重定向（在80端口虚拟主机中配置）
    <VirtualHost *:80>
        ServerName secure.example.com
        Redirect permanent / https://secure.example.com/
    </VirtualHost>
</VirtualHost>
```

## 四、常用模块配置

### 1. 重写模块（mod_rewrite）
```apache
<Directory "/var/www/html">
    RewriteEngine On
    
    # 强制HTTPS
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]
    
    # 重写URL
    RewriteRule ^product/([0-9]+)/?$ product.php?id=$1 [NC,L]
    
    # 禁止特定IP访问
    RewriteCond %{REMOTE_ADDR} ^192\.168\.1\.100
    RewriteRule .* - [F]
</Directory>
```

### 2. 安全模块（mod_security）
```apache
<IfModule mod_security2.c>
    SecRuleEngine On
    SecRequestBodyAccess On
    SecResponseBodyAccess On
    
    # 防止SQL注入
    SecRule ARGS "union.*select" "id:1001,deny,status:403"
    
    # 防止XSS攻击
    SecRule ARGS "<script" "id:1002,deny,status:403"
</IfModule>
```

### 3. 压缩模块（mod_deflate）
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/json
    
    # 排除特定浏览器
    BrowserMatch ^Mozilla/4 gzip-only-text/html
</IfModule>
```

### 4. 缓存模块（mod_expires）
```apache
<IfModule mod_expires.c>
    ExpiresActive On
    
    # 图片缓存1个月
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    
    # CSS和JS缓存1周
    ExpiresByType text/css "access plus 1 week"
    ExpiresByType application/javascript "access plus 1 week"
</IfModule>
```

## 五、性能优化配置

### 1. 进程管理（MPM配置）
```apache
# prefork MPM（适合兼容性要求高的环境）
<IfModule mpm_prefork_module>
    StartServers             5
    MinSpareServers          5
    MaxSpareServers         10
    MaxRequestWorkers      150
    MaxConnectionsPerChild   0
</IfModule>

# worker MPM（适合高并发环境）
<IfModule mpm_worker_module>
    StartServers             3
    MinSpareThreads         75
    MaxSpareThreads        250
    ThreadsPerChild         25
    MaxRequestWorkers      400
</IfModule>
```

### 2. 连接和超时设置
```apache
Timeout 60
KeepAlive On
MaxKeepAliveRequests 100
KeepAliveTimeout 5
```

## 六、安全配置

### 1. 基本安全设置
```apache
# 隐藏Apache版本信息
ServerTokens Prod
ServerSignature Off

# 禁止目录浏览
Options -Indexes

# 限制访问特定文件
<FilesMatch "^\.">
    Require all denied
</FilesMatch>

<FilesMatch "\.(htaccess|htpasswd|ini|log|sh|bak)$">
    Require all denied
</FilesMatch>
```

### 2. 防止点击劫持
```apache
Header always append X-Frame-Options SAMEORIGIN
Header set X-Content-Type-Options nosniff
Header set X-XSS-Protection "1; mode=block"
```

## 七、.htaccess 文件示例

```
# 密码保护目录
AuthType Basic
AuthName "Restricted Area"
AuthUserFile /etc/apache2/.htpasswd
Require valid-user

# 自定义错误页面
ErrorDocument 404 /errors/404.html
ErrorDocument 500 /errors/500.html

# 设置默认首页
DirectoryIndex index.php index.html index.htm

# 禁止特定User-Agent
SetEnvIfNoCase User-Agent "badbot" bad_bot
Order Allow,Deny
Deny from env=bad_bot
Allow from all
```

## 八、常用命令

```bash
# 检查配置语法
apachectl configtest
# 或
apache2ctl -t

# 重新加载配置（不中断服务）
systemctl reload apache2
# 或
service apache2 reload

# 重启Apache
systemctl restart apache2

# 查看已加载模块
apache2ctl -M

# 查看编译参数
apache2ctl -V

# 启用/禁用站点
a2ensite example.com.conf
a2dissite example.com.conf

# 启用/禁用模块
a2enmod rewrite
a2dismod rewrite
```

## 九、故障排查

### 1. 检查日志
```bash
# 实时查看错误日志
tail -f /var/log/apache2/error.log

# 查看访问日志
tail -f /var/log/apache2/access.log

# 按日期分析日志
grep "23/Oct/2024" /var/log/apache2/access.log
```

### 2. 常见问题
- **403 Forbidden**: 检查目录权限和SELinux设置
- **500 Internal Error**: 检查应用程序代码和错误日志
- **无法启动**: 使用 `apachectl configtest` 检查配置语法
- **模块未加载**: 确认模块是否启用，配置文件路径是否正确
