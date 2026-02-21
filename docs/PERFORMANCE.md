# Performance Optimization Guide

## Backend Optimization

### Database

#### 1. Use Database Indexes
```python
class Patient(models.Model):
    email = models.EmailField(unique=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
```

#### 2. Query Optimization
```python
# Bad - N+1 queries
patients = Patient.objects.all()
for patient in patients:
    print(patient.appointments.all())

# Good - Use select_related/prefetch_related
patients = Patient.objects.prefetch_related('appointments').all()
```

#### 3. Database Connection Pooling
```python
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'CONN_MAX_AGE': 600,
    }
}
```

### Caching

#### 1. Install Redis
```bash
pip install redis django-redis
```

#### 2. Configure Cache
```python
# settings.py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
```

#### 3. Use Cache Decorators
```python
from django.views.decorators.cache import cache_page

@cache_page(60 * 15)  # Cache for 15 minutes
def hospital_list(request):
    return Hospital.objects.all()
```

### API Optimization

#### 1. Pagination
Already configured in `settings.py`:
```python
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}
```

#### 2. Response Compression
```bash
pip install django-compression-middleware
```

#### 3. API Rate Limiting
```python
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour'
    }
}
```

## Frontend Optimization

### 1. Code Splitting
```javascript
// Use React.lazy for route-based code splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Triage = React.lazy(() => import('./pages/Triage'));
```

### 2. Image Optimization
- Use WebP format
- Implement lazy loading
- Compress images before upload

### 3. Bundle Size Reduction
```bash
# Analyze bundle size
npm run build
npx vite-bundle-visualizer
```

### 4. Memoization
```javascript
import { useMemo, useCallback } from 'react';

const ExpensiveComponent = ({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => /* expensive operation */);
  }, [data]);

  return <div>{processedData}</div>;
};
```

### 5. Virtual Scrolling
For large lists, use react-window or react-virtualized.

## Production Deployment

### 1. Enable Gzip Compression
```nginx
# nginx.conf
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

### 2. Use CDN
- Serve static files from CDN
- Use CloudFront or similar service

### 3. Enable HTTP/2
```nginx
listen 443 ssl http2;
```

### 4. Database Optimization
- Regular VACUUM on PostgreSQL
- Monitor slow queries
- Add appropriate indexes

### 5. Load Balancing
Use multiple application servers behind a load balancer.

## Monitoring

### 1. Application Performance Monitoring
- Use Django Debug Toolbar (development)
- Implement Sentry for error tracking
- Use New Relic or DataDog (production)

### 2. Database Monitoring
```python
# Log slow queries
LOGGING = {
    'loggers': {
        'django.db.backends': {
            'level': 'DEBUG',
        }
    }
}
```

### 3. Frontend Monitoring
- Use Lighthouse for performance audits
- Implement Web Vitals tracking
- Monitor bundle sizes

## Benchmarking

### Backend
```bash
# Use locust for load testing
pip install locust
locust -f locustfile.py
```

### Frontend
```bash
# Use Lighthouse CI
npm install -g @lhci/cli
lhci autorun
```

## Quick Wins

1. ✅ Enable Django's `CONN_MAX_AGE`
2. ✅ Use `select_related()` and `prefetch_related()`
3. ✅ Implement pagination
4. ✅ Enable gzip compression
5. ✅ Use React.lazy for code splitting
6. ✅ Optimize images
7. ✅ Add database indexes
8. ✅ Enable caching for static content
9. ✅ Minify CSS/JS in production
10. ✅ Use CDN for static assets

## Performance Targets

- **Page Load Time:** < 2 seconds
- **API Response Time:** < 200ms
- **Time to Interactive:** < 3 seconds
- **First Contentful Paint:** < 1 second
- **Database Query Time:** < 50ms average
