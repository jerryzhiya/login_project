export function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error', 'Please log in to view this page');
  res.redirect('/auth/log-in');
}

export function ensureMember(req, res, next) {
  if (req.user?.ismember || req.user?.isadmin) return next();
  req.flash('error', 'Members only');
  res.redirect('/club/join');
}

export function ensureAdmin(req, res, next) {
  if(req.user?.isadmin) return next();
  req.flash('error', 'Admin only');
  res.redirect('/')
}