# Deployment Guide

## Production Checklist

### Backend Configuration

1. **Environment Variables**
```bash
DJANGO_SECRET_KEY=<strong-random-key>
DEBUG=False
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DATABASE_URL=postgres://user:pass@host:5432/dbname
CORS_ORIGINS=https://yourdomain.com
```

2. **Security Settings**
- Set strong SECRET_KEY
- Disable DEBUG mode
- Configure ALLOWED_HOSTS
- Use HTTPS only
- Enable CSRF protection
- Configure secure cookies

3. **Database**
- Use PostgreSQL in production
- Enable connection pooling
- Regular backups
- Monitor performance

4. **Static Files**
```bash
python manage.py collectstatic --noinput
```

### Frontend Configuration

1. **Build for Production**
```bash
npm run build
```

2. **Environment Variables**
```bash
VITE_API_URL=https://api.yourdomain.com
```

### Docker Deployment

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Server Requirements

- Python 3.11+
- Node.js 20+
- PostgreSQL 15+
- 2GB RAM minimum
- 20GB storage

### Monitoring

- Set up logging
- Configure error tracking (Sentry)
- Monitor server resources
- Database performance monitoring
- API response times

### Backup Strategy

- Daily database backups
- Weekly full system backups
- Store backups off-site
- Test restore procedures

### SSL/TLS

- Use Let's Encrypt for free SSL
- Configure HTTPS redirect
- Enable HSTS
- Update security headers
