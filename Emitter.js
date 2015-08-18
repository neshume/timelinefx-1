
var AngAlign = 0;
var AngRandom = 1;
var AngSpecify = 2;

var Emitter = Class(Entity,{

 constructor: function() {
    Emitter.$super.call(this);        // Call parent'sructor

    this._currentLife = 0;
    this._uniform = true;
    this._parentEffect = null;
    this._image = null;
    this._handleCenter = false;
    this._angleOffset = 0;
    this._lockedAngle = false;
    this._gx = 0;
    this._gy = 0;
    this._counter = 0;
    this._oldCounter = 0;
    this._angleType = AngAlign;
    this._angleRelative = false;
    this._useEffectEmission = false;
    this._deleted = false;
    this._visible = true;
    this._singleParticle = false;
    this._startedSpawning = false;
    this._spawned = 0;
    this._randomColor = false;
    this._zLayer = 0;
    this._animate = false;
    this._randomStartFrame = false;
    this._animationDirection = 1;
    this._colorRepeat = 0;
    this._alphaRepeat = 0;
    this._dirAlternater = false;
    this._oneShot = false;
    this._particlesRelative = false;
    this._tweenSpawns = false;
    this._once = false;
    this._dying = false;
    this._groupParticles = false;

    this._bypassWeight = false;
    this._bypassSpeed = false;
    this._bypassSpin = false;
    this._bypassDirectionvariation = false;
    this._bypassColor = false;
    this._bRed = false;
    this._bGreen = false;
    this._bBlue = false;
    this._bypassScaleX = false;
    this._bypassScaleY = false;
    this._bypassLifeVariation = false;
    this._bypassFramerate = false;
    this._bypassStretch = false;
    this._bypassSplatter = false;

    this._AABB_ParticleMaxWidth = 0;
    this._AABB_ParticleMaxHeight = 0;
    this._AABB_ParticleMinWidth = 0;
    this._AABB_ParticleMinHeight = 0;

    this._currentLifeVariation = 0;
    this._currentWeight = 0;
    this._currentWeightVariation = 0;
    this._currentSpeed = 0;
    this._currentSpeedVariation = 0;
    this._currentSpin = 0;
    this._currentSpinVariation = 0;
    this._currentDirectionVariation = 0;
    this._currentEmissionAngle = 0;
    this._currentEmissionRange = 0;
    this._currentSizeX = 0;
    this._currentSizeY = 0;
    this._currentSizeXVariation = 0;
    this._currentSizeYVariation = 0;
    this._currentFramerate = 0;

    this._arrayOwner = true;

    this._childrenOwner = false;         // the Particles are managing by pool

    this._cAmount = new EmitterArray(EffectsLibrary.amountMin, EffectsLibrary.amountMax);
    this._cLife = new EmitterArray(EffectsLibrary.lifeMin, EffectsLibrary.lifeMax);
    this._cSizeX = new EmitterArray(EffectsLibrary.dimensionsMin, EffectsLibrary.dimensionsMax);
    this._cSizeY = new EmitterArray(EffectsLibrary.dimensionsMin, EffectsLibrary.dimensionsMax);
    this._cBaseSpeed = new EmitterArray(EffectsLibrary.velocityMin, EffectsLibrary.velocityMax);
    this._cBaseWeight = new EmitterArray(EffectsLibrary.weightMin, EffectsLibrary.weightMax);
    this._cBaseSpin = new EmitterArray(EffectsLibrary.spinMin, EffectsLibrary.spinMax);
    this._cEmissionAngle = new EmitterArray(EffectsLibrary.angleMin, EffectsLibrary.angleMax);
    this._cEmissionRange = new EmitterArray(EffectsLibrary.emissionRangeMin, EffectsLibrary.emissionRangeMax);
    this._cSplatter = new EmitterArray(EffectsLibrary.dimensionsMin, EffectsLibrary.dimensionsMax);
    this._cVelVariation = new EmitterArray(EffectsLibrary.velocityMin, EffectsLibrary.velocityMax);
    this._cWeightVariation = new EmitterArray(EffectsLibrary.weightVariationMin, EffectsLibrary.weightVariationMax);
    this._cLifeVariation = new EmitterArray(EffectsLibrary.lifeMin, EffectsLibrary.lifeMax);
    this._cAmountVariation = new EmitterArray(EffectsLibrary.amountMin, EffectsLibrary.amountMax);
    this._cSizeXVariation = new EmitterArray(EffectsLibrary.dimensionsMin, EffectsLibrary.dimensionsMax);
    this._cSizeYVariation = new EmitterArray(EffectsLibrary.dimensionsMin, EffectsLibrary.dimensionsMax);
    this._cSpinVariation = new EmitterArray(EffectsLibrary.spinVariationMin, EffectsLibrary.spinVariationMax);
    this._cDirectionVariation = new EmitterArray(EffectsLibrary.globalPercentMin, EffectsLibrary.globalPercentMax);
    this._cAlpha = new EmitterArray(0, 1.0);
    this._cR = new EmitterArray(0, 0);
    this._cG = new EmitterArray(0, 0);
    this._cB = new EmitterArray(0, 0);
    this._cScaleX = new EmitterArray(EffectsLibrary.globalPercentMin, EffectsLibrary.globalPercentMax);
    this._cScaleY = new EmitterArray(EffectsLibrary.globalPercentMin, EffectsLibrary.globalPercentMax);
    this._cSpin = new EmitterArray(EffectsLibrary.spinOverTimeMin, EffectsLibrary.spinOverTimeMax);
    this._cVelocity = new EmitterArray(EffectsLibrary.velocityOverTimeMin, EffectsLibrary.velocityOverTimeMax);
    this._cWeight = new EmitterArray(EffectsLibrary.globalPercentMin, EffectsLibrary.globalPercentMax);
    this._cDirection = new EmitterArray(EffectsLibrary.directionOverTimeMin, EffectsLibrary.directionOverTimeMax);
    this._cDirectionVariationOT = new EmitterArray(EffectsLibrary.globalPercentMin, EffectsLibrary.globalPercentMax);
    this._cFramerate = new EmitterArray(EffectsLibrary.framerateMin, EffectsLibrary.framerateMax);
    this._cStretch = new EmitterArray(EffectsLibrary.globalPercentMin, EffectsLibrary.globalPercentMax);
    this._cGlobalVelocity = new EmitterArray(EffectsLibrary.globalPercentMin, EffectsLibrary.globalPercentMax);
  },

  SortAll:function()
   {
       this._cR.Sort();
       this._cG.Sort();
       this._cB.Sort();
       this._cBaseSpin.Sort();
       this._cSpin.Sort();
       this._cSpinVariation.Sort();
       this._cVelocity.Sort();
       this._cBaseSpeed.Sort();
       this._cVelVariation.Sort();
       //_cAs.Sort();
       this._cAlpha.Sort();
       this._cSizeX.Sort();
       this._cSizeY.Sort();
       this._cScaleX.Sort();
       this._cScaleY.Sort();
       this._cSizeXVariation.Sort();
       this._cSizeYVariation.Sort();
       this._cLifeVariation.Sort();
       this._cLife.Sort();
       this._cAmount.Sort();
       this._cAmountVariation.Sort();
       this._cEmissionAngle.Sort();
       this._cEmissionRange.Sort();
       this._cFramerate.Sort();
       this._cStretch.Sort();
       this._cGlobalVelocity.Sort();
   },

   ShowAll:function()
   {
       this.SetVisible(true);
       for(var i=0;i<this._effects.length;i++)
       {
         this._effects[i].ShowAll();
       }
   },

   HideAll:function()
   {
       this.SetVisible(false);
       for(var i=0;i<this._effects.length;i++)
       {
         this._effects[i].HideAll();
       }
   },

   AddScaleX:function( f, v )
   {
       return this._cScaleX.Add(f, v);
   },

   AddScaleY:function( f, v )
   {
       return this._cScaleY.Add(f, v);
   },

   AddSizeX:function( f, v )
 {
     return this._cSizeX.Add(f, v);
 },

 AddSizeY:function( f, v )
 {
     return this._cSizeY.Add(f, v);
 },

 AddSizeXVariation:function( f, v )
 {
     return this._cSizeXVariation.Add(f, v);
 },

 AddSizeYVariation:function( f, v )
 {
     return this._cSizeYVariation.Add(f, v);
 },

 AddBaseSpeed:function( f, v )
 {
     return this._cBaseSpeed.Add(f, v);
 },

 AddVelocity:function( f, v )
 {
     return this._cVelocity.Add(f, v);
 },

 AddBaseWeight:function( f, v )
 {
     return this._cBaseWeight.Add(f, v);
 },

 AddWeightVariation:function( f, v )
 {
     return this._cWeightVariation.Add(f, v);
 },

 AddWeight:function( f, v )
 {
     return this._cWeight.Add(f, v);
 },

 AddVelVariation:function( f, v )
 {
     return this._cVelVariation.Add(f, v);
 },

 AddAlpha:function( f, v )
 {
     return this._cAlpha.Add(f, v);
 },

 AddSpin:function( f, v )
 {
     return this._cSpin.Add(f, v);
 },

 AddBaseSpin:function( f, v )
 {
     return this._cBaseSpin.Add(f, v);
 },

 AddSpinVariation:function( f, v )
 {
     return this._cSpinVariation.Add(f, v);
 },

 AddR:function( f, v )
 {
     return this._cR.Add(f, v);
 },

 AddG:function( f, v )
 {
     return this._cG.Add(f, v);
 },

 AddB:function( f, v )
 {
     return this._cB.Add(f, v);
 },

 AddLifeVariation:function( f, v )
 {
     return this._cLifeVariation.Add(f, v);
 },

 AddLife:function( f, v )
 {
     return this._cLife.Add(f, v);
 },

 AddAmount:function( f, v )
 {
     return this._cAmount.Add(f, v);
 },

 AddAmountVariation:function( f, v )
 {
     return this._cAmountVariation.Add(f, v);
 },

 AddEmissionAngle:function( f, v )
 {
     return this._cEmissionAngle.Add(f, v);
 },

 AddEmissionRange:function( f, v )
 {
     return this._cEmissionRange.Add(f, v);
 },

 AddGlobalVelocity:function( f, v )
 {
     return this._cGlobalVelocity.Add(f, v);
 },

 AddDirection:function( f, v )
 {
     return this._cDirection.Add(f, v);
 },

 AddDirectionVariation:function( f, v )
 {
     return this._cDirectionVariation.Add(f, v);
 },

 AddDirectionVariationOT:function( f, v )
 {
     return this._cDirectionVariationOT.Add(f, v);
 },

 AddFramerate:function( f, v )
 {
     return this._cFramerate.Add(f, v);
 },

 AddStretch:function( f, v )
 {
     return this._cStretch.Add(f, v);
 },

 AddSplatter:function( f, v )
 {
     return this._cSplatter.Add(f, v);
 },

 AddEffect:function( effect )
 {
     this._effects.push(effect);
 },

 SetParentEffect:function( parent )
 {
     this._parentEffect = parent;
 },

 SetImage:function( image )
 {
     this._image = image;
     this._AABB_ParticleMaxWidth = image.GetWidth() * 0.5;
     this._AABB_ParticleMaxHeight = image.GetHeight() * 0.5;
     this._AABB_ParticleMinWidth = image.GetWidth() * (-0.5);
     this._AABB_ParticleMinHeight = image.GetHeight() * (-0.5);
 },

 SetAngleOffset:function( offset )
 {
     this._angleOffset = offset;
 },

 SetUniform:function( value )
 {
     this._uniform = value;
 },

 SetAngleType:function( angleType )
 {
     this._angleType = angleType;
 },

 SetUseEffectEmission:function( value )
 {
     this._useEffectEmission = value;
 },

 SetVisible:function( value )
 {
     this._visible = value;
 },

 SetSingleParticle:function( value )
 {
     this._singleParticle = value;
 },

 SetRandomColor:function( value )
 {
     this._randomColor = value;
 },

 SetZLayer:function( zLayer )
 {
     this._zLayer = zLayer;
 },

 SetAnimate:function( value )
 {
     this._animate = value;
 },

 SetRandomStartFrame:function( value )
 {
     this._randomStartFrame = value;
 },

 SetAnimationDirection:function( direction )
 {
     this._animationDirection = direction;
 },

 SetColorRepeat:function( repeat )
 {
     this._colorRepeat = repeat;
 },

 SetAlphaRepeat:function( repeat )
 {
     this._alphaRepeat = repeat;
 },

 SetOneShot( bool value )
 {
     this._oneShot = value;
 },

 SetHandleCenter( bool value )
 {
     this._handleCenter = value;
 },

 SetParticlesRelative( bool value )
 {
     this._particlesRelative = value;
 },

 SetTweenSpawns( bool value )
 {
     this._tweenSpawns = value;
 },

 SetLockAngle( bool value )
 {
     this._lockedAngle = value;
 },

 SetAngleRelative( bool value )
 {
     this._angleRelative = value;
 },

 SetOnce( bool value )
 {
     this._once = value;
 },

 SetGroupParticles( bool value )
 {
     this._groupParticles = value;
 },

 Effect* Emitter::GetParentEffect()
 {
     return this._parentEffect;
 },

 GetImage:function()
 {
     return this._image;
 },

 GetAngleOffset:function()
 {
     return this._angleOffset;
 },

 IsUniform:function()
 {
     return this._uniform;
 },

 GetAngleType:function()
 {
     return this._angleType;
 },

 IsUseEffectEmmision:function()
 {
     return this._useEffectEmission;
 },

 IsVisible:function()
 {
     return this._visible;
 },

 IsSingleParticle:function()
 {
     return this._singleParticle;
 },

 IsRandomColor:function()
 {
     return this._randomColor;
 },

 GetZLayer:function()
 {
     return this._zLayer;
 },

 IsAnimate:function()
 {
     return this._animate;
 },

 IsRandomStartFrame:function()
 {
     return this._randomStartFrame;
 },

 GetAnimationDirection:function()
 {
     return this._animationDirection;
 },

 GetColorRepeat:function()
 {
     return this._colorRepeat;
 },

 GetAlphaRepeat:function()
 {
     return this._alphaRepeat;
 },

 IsOneShot:function()
 {
     return this._oneShot;
 },

 IsHandleCenter:function()
 {
     return this._handleCenter;
 },

 IsParticlesRelative:function()
 {
     return this._particlesRelative;
 },

 IsTweenSpawns:function()
 {
     return this._tweenSpawns;
 },

 IsLockAngle:function()
 {
     return this._lockedAngle;
 },

 IsAngleRelative:function()
 {
     return this._angleRelative;
 },

 IsOnce:function()
 {
     return this._once;
 },

 IsGroupParticles:function()
 {
     return this._groupParticles;
 },

 GetPath:function()
 {
     return this._path.c_str();
 },

 SetRadiusCalculate:function( value )
 {
     this._radiusCalculate = value;

     for (var i=0;i<this._children.length;i++)
     {
         this._children[i].SetRadiusCalculate(value);
     }

     for (var i=0;i<this._effects.length;i++)
     {
         this._effects[i].SetRadiusCalculate(value);
     }
 },

 Destroy:function(releaseChildren)
 {
     this._parentEffect = NULL;
     this._image = NULL;

     for (var i=0;i<this._effects.length;i++)
     {
         this._effects[i].Destroy();
     }

     this._effects = [];

     base::Destroy(false);
 },

 ChangeDoB:function( dob )
 {
     this._dob = dob;

     for (var i=0;i<this._effects.length;i++)
     {
         this._effects[i].ChangeDoB(dob);
     }
 },

 Update:function()
 {
     this.Capture();

     this._matrix.Set(cosf(this._angle / 180.0* M_PI), sinf(this._angle / 180.0* M_PI), -sinf(this._angle / 180.0* M_PI), cosf(this._angle / 180.0* M_PI));

     if (this._parent && this._relative)
     {
         this.SetZ(this._parent.GetZ());
         this._matrix = this._matrix.Transform(this._parent.GetMatrix());
         Vector2 rotvec = this._parent.GetMatrix().TransformVector(Vector2(this._x, this._y));

         this._wx = this._parent.GetWX() + rotvec.x * this._z;
         this._wy = this._parent.GetWY() + rotvec.y * this._z;

         this._relativeAngle = this._parent.GetRelativeAngle() + this._angle;
     }
     else
     {
         this._wx = this._x;
         this._wy = this._y;
     }

     if (!this._tweenSpawns)
     {
         this.Capture();
         this._tweenSpawns = true;
     }

     this._dying = this._parentEffect.IsDying();

     base::UpdateBoundingBox();

     if (this._radiusCalculate)
         base::UpdateEntityRadius();

     UpdateChildren();

     if (!this._dead && !this._dying)
     {
         if (this._visible &&this._parentEffect.GetParticleManager().IsSpawningAllowed())
             UpdateSpawns();
     }
     else
     {
         if (this._children.empty())
         {
             this.Destroy();
             return false;
         }
         else
         {
             this.KillChildren();
         }
     }
     return true;
 }

 UpdateSpawns:function( eSingle /*= NULL*/ )
 {
     var intCounter;
     var qty;
     var er;
     var e;
     var parentEffect = this._parentEffect;
     var curFrame = parentEffect.GetCurrentEffectFrame();
     var pm = parentEffect.GetParticleManager();

     qty = ((GetEmitterAmount(curFrame) + Rnd(GetEmitterAmountVariation(curFrame))) * parentEffect.GetCurrentAmount() * pm.GetGlobalAmountScale()) / EffectsLibrary.GetUpdateFrequency();
     if (!this._singleParticle)
         this._counter += qty;
     intCounter = this._counter;
     if (intCounter >= 1 || (this._singleParticle && !this._startedSpawning))
     {
         TLFXLOG(PARTICLES, ("spawned: %d", intCounter));
         if (!this._startedSpawning && this._singleParticle)
         {
             switch (parentEffect.GetClass())
             {
             case TypePoint: intCounter = 1; break;
             case TypeArea:  intCounter = parentEffect.GetMGX() * parentEffect.GetMGY(); break;
             case TypeLine:
             case TypeEllipse: intCounter = parentEffect.GetMGX(); break;
             }
         }
         else if (this._singleParticle && this._startedSpawning)
         {
             intCounter = 0;
         }

         // preload attributes
         this._currentLife = this.GetEmitterLife(curFrame) * parentEffect.GetCurrentLife();
         if (!this._bypassWeight)
         {
             this._currentWeight = this.GetEmitterBaseWeight(curFrame);
             this._currentWeightVariation = this.GetEmitterWeightVariation(curFrame);
         }

         if (!this._bypassSpeed)
         {
             this._currentSpeed = this.GetEmitterBaseSpeed(curFrame);
             this._currentSpeedVariation = this.GetEmitterVelVariation(curFrame);
         }

         if (!this._bypassSpin)
         {
            this._currentSpin = this.GetEmitterBaseSpin(curFrame);
            this._currentSpinVariation = this.GetEmitterSpinVariation(curFrame);
         }

         this._currentDirectionVariation = this.GetEmitterDirectionVariation(curFrame);

         if (this._useEffectEmission)
         {
             er = parentEffect.GetCurrentEmissionRange();
             this._currentEmissionAngle = parentEffect.GetCurrentEmissionAngle();
         }
         else
         {
             er = this.GetEmitterEmissionRange(curFrame);
             this._currentEmissionAngle = this.GetEmitterEmissionAngle(curFrame);
         }

         this._currentLifeVariation = this.GetEmitterLifeVariation(curFrame);
         this._currentSizeX = this.GetEmitterSizeX(curFrame);
         this._currentSizeY = this.GetEmitterSizeY(curFrame);
         this._currentSizeXVariation = this.GetEmitterSizeXVariation(curFrame);
         this._currentSizeYVariation = this.GetEmitterSizeYVariation(curFrame);

         // ------------------------------
         for (var c = 1; c <= intCounter; ++c)
         {
             this._startedSpawning = true;
             assert(pm);
             if (!eSingle)
             {
                 e = pm.GrabParticle(parentEffect, this._groupParticles, this._zLayer);
             }
             else
             {
                 e = eSingle;
             }

             if (e)
             {
#ifdef _DEBUG
                 ++EffectsLibrary.particlesCreated;
#endif
                 // -----Link to its emitter and assign the control source (which is this emitter)----
                 e.SetEmitter(this);
                 e.SetParent(this);
                 e.SetParticleManager(pm);
                 e.SetEffectLayer(parentEffect.GetEffectLayer());
                 // ----------------------------------------------------
                 e.SetDoB(pm.GetCurrentTime());

                 if (parentEffect.GetTraverseEdge() && parentEffect.GetClass() == TypeLine)
                 {
                     this._particlesRelative = true;
                 }
                 e.SetRelative(this._particlesRelative);

                 switch (parentEffect.GetClass())
                 {
                 case TypePoint:
                     if (e.IsRelative())
                     {
                         e.SetX((0 - parentEffect.GetHandleX()));
                         e.SetY((0 - parentEffect.GetHandleY()));
                     }
                     else
                     {
                         var tween = c / intCounter;
                         if (parentEffect.GetHandleCenter() || (parentEffect.GetHandleX() + parentEffect.GetHandleY() == 0))
                         {
                             // @dan already set? tween = c / intCounter;
                             e.SetX(TweenValues(this._oldWX, this._wx, tween));
                             e.SetY(TweenValues(this._oldWY, this._wy, tween));
                             if (this._z != 1)
                             {
                                 e.SetWX(e.GetX() - parentEffect.GetHandleX() * this._z);
                                 e.SetWY(e.GetY() - parentEffect.GetHandleY() * this._z);
                             }
                             else
                             {
                                 e.SetWX(e.GetX() - parentEffect.GetHandleX());
                                 e.SetWY(e.GetY() - parentEffect.GetHandleY());
                             }
                         }
                         else
                         {
                             e.SetX((0 - parentEffect.GetHandleX()));
                             e.SetY((0 - parentEffect.GetHandleY()));
                             var rotvec = this._parent.GetMatrix().TransformVector(Vector2(e.GetX(), e.GetY()));
                             e.SetX(TweenValues(this._oldWX, this._wx, tween) + rotvec.x);
                             e.SetY(TweenValues(this._oldWY, this._wy, tween) + rotvec.y);
                             if (this._z != 1)
                             {
                                 e.SetWX(e.GetX() * this._z);
                                 e.SetWY(e.GetY() * this._z);
                             }
                             else
                             {
                                 e.SetWX(e.GetX());
                                 e.SetWY(e.GetY());
                             }
                         }
                     }
                     break;

                 case TypeArea:
                     if (parentEffect.GetEmitAtPoints())
                     {
                         if (parentEffect.GetSpawnDirection() == -1)
                         {
                             this._gx += parentEffect.GetSpawnDirection();
                             if (this._gx < 0)
                             {
                                 this._gx = parentEffect.GetMGX() - 1;
                                 this._gy += parentEffect.GetSpawnDirection();
                                 if (this._gy < 0)
                                     this._gy = parentEffect.GetMGY() - 1;
                             }
                         }

                         if (parentEffect.GetMGX() > 1)
                         {
                             e.SetX((this._gx / (parentEffect.GetMGX() - 1) * parentEffect.GetCurrentWidth()) - parentEffect.GetHandleX());
                         }
                         else
                         {
                             e.SetX((-parentEffect.GetHandleX()));
                         }

                         if (parentEffect.GetMGY() > 1)
                         {
                             e.SetY((this._gy / (parentEffect.GetMGY() - 1) * parentEffect.GetCurrentHeight()) - parentEffect.GetHandleY());
                         }
                         else
                         {
                             e.SetY((-parentEffect.GetHandleY()));
                         }

                         if (parentEffect.GetSpawnDirection() == 1)
                         {
                             this._gx += parentEffect.GetSpawnDirection();
                             if (this._gx >= parentEffect.GetMGX())
                             {
                                 this._gx = 0;
                                 this._gy += parentEffect.GetSpawnDirection();
                                 if (this._gy >= parentEffect.GetMGY())
                                     this._gy = 0;
                             }
                         }
                     }
                     else
                     {
                         e.SetX(Rnd(parentEffect.GetCurrentWidth())  - parentEffect.GetHandleX());
                         e.SetY(Rnd(parentEffect.GetCurrentHeight()) - parentEffect.GetHandleY());
                     }

                     if (!e.IsRelative())
                     {
                        var parent = this._parent;
                         Vector2 rotvec = parent.GetMatrix().TransformVector(Vector2(e.GetX(), e.GetY()));
                         if (this._z != 1)
                         {
                             e.SetX(parent.GetWX() + rotvec.x * this._z);
                             e.SetY(parent.GetWY() + rotvec.y * this._z);
                         }
                         else
                         {
                             e.SetX(parent.GetWX() + rotvec.x);
                             e.SetY(parent.GetWY() + rotvec.y);
                         }
                     }

                     break;

                 case TypeEllipse:
                     {
                         var tx = parentEffect.GetCurrentWidth()  / 2.0f;
                         var ty = parentEffect.GetCurrentHeight() / 2.0f;
                         var th = 0;

                         if (parentEffect.GetEmitAtPoints())
                         {
                             if (parentEffect.GetMGX() == 0)
                                 parentEffect.SetMGX(1);

                             this._gx += parentEffect.GetSpawnDirection();
                             if (this._gx >= parentEffect.GetMGX())
                             {
                                 this._gx = 0;
                             }
                             else if (this._gx < 0)
                             {
                                 this._gx = parentEffect.GetMGX() - 1;
                             }

                             th = this._gx * (parentEffect.GetEllipseArc() / parentEffect.GetMGX()) + parentEffect.GetEllipseOffset();
                         }
                         else
                         {
                             th = Rnd(parentEffect.GetEllipseArc()) + parentEffect.GetEllipseOffset();
                         }
                         e.SetX( cosf(th / 180.0* M_PI) * tx - parentEffect.GetHandleX() + tx);
                         e.SetY(-sinf(th / 180.0* M_PI) * ty - parentEffect.GetHandleY() + ty);

                         if (!e.IsRelative())
                         {
                             Vector2 rotvec = this._parent.GetMatrix().TransformVector(Vector2(e.GetX(), e.GetY()));
                             if (this._z != 1)
                             {
                                 e.SetX(this._parent.GetWX() + rotvec.x * this._z);
                                 e.SetY(this._parent.GetWY() + rotvec.y * this._z);
                             }
                             else
                             {
                                 e.SetX(this._parent.GetWX() + rotvec.x);
                                 e.SetY(this._parent.GetWY() + rotvec.y);
                             }
                         }
                     }
                     break;

                 case TypeLine:
                     if (!parentEffect.GetTraverseEdge())
                     {
                         if (parentEffect.GetEmitAtPoints())
                         {
                             if (parentEffect.GetSpawnDirection() == -1)
                             {
                                 this._gx += parentEffect.GetSpawnDirection();
                                 if (this._gx < 0)
                                     this._gx = parentEffect.GetMGX() - 1;
                             }

                             if (parentEffect.GetMGX() > 1)
                             {
                                 e.SetX((this._gx / (parentEffect.GetMGX() - 1) * parentEffect.GetCurrentWidth()) - parentEffect.GetHandleX());
                             }
                             else
                             {
                                 e.SetX((-parentEffect.GetHandleX()));
                             }
                             e.SetY((-parentEffect.GetHandleY()));

                             if (parentEffect.GetSpawnDirection() == 1)
                             {
                                 this._gx += parentEffect.GetSpawnDirection();
                                 if (this._gx >= parentEffect.GetMGX())
                                     this._gx = 0;
                             }
                         }
                         else
                         {
                             e.SetX(Rnd(parentEffect.GetCurrentWidth()) - parentEffect.GetHandleX());
                             e.SetY((-parentEffect.GetHandleY()));
                         }
                     }
                     else
                     {
                         if (parentEffect.GetDistanceSetByLife())
                         {
                             e.SetX((-parentEffect.GetHandleX()));
                             e.SetY((-parentEffect.GetHandleY()));
                         }
                         else
                         {
                             if (parentEffect.GetEmitAtPoints())
                             {
                                 if (parentEffect.GetSpawnDirection() == -1)
                                 {
                                     this._gx += parentEffect.GetSpawnDirection();
                                     if (this._gx < 0)
                                         this._gx = parentEffect.GetMGX() - 1;
                                 }

                                 if (parentEffect.GetMGX() > 1)
                                 {
                                     e.SetX((this._gx / (parentEffect.GetMGX() - 1) * parentEffect.GetCurrentWidth()) - parentEffect.GetHandleX());
                                 }
                                 else
                                 {
                                     e.SetX((-parentEffect.GetHandleX()));
                                 }
                                 e.SetY((-parentEffect.GetHandleY()));

                                 if (parentEffect.GetSpawnDirection() == 1)
                                 {
                                     this._gx += parentEffect.GetSpawnDirection();
                                     if (this._gx >= parentEffect.GetMGX())
                                         this._gx = 0;
                                 }
                             }
                             else
                             {
                                 e.SetX(Rnd(parentEffect.GetCurrentWidth()) - parentEffect.GetHandleX());
                                 e.SetY((-parentEffect.GetHandleY()));
                             }
                         }
                     }

                     // rotate
                     if (!e.IsRelative())
                     {
                         Vector2 rotvec = this._parent.GetMatrix().TransformVector(Vector2(e.GetX(), e.GetY()));
                         if (this._z != 1)
                         {
                             e.SetX(this._parent.GetWX() + rotvec.x * this._z);
                             e.SetY(this._parent.GetWY() + rotvec.y * this._z);
                         }
                         else
                         {
                             e.SetX(this._parent.GetWX() + rotvec.x);
                             e.SetY(this._parent.GetWY() + rotvec.y);
                         }
                     }
                     break;
                 }

                 // set the zoom level
                 e.SetZ(this._z);

                 // set up the image
                 e.SetAvatar(this._image);
                 e.SetHandleX(this._handleX);
                 e.SetHandleY(this._handleY);
                 e.SetAutocenter(this._handleCenter);

                 // set lifetime properties
                 e.SetLifeTime((int)(this._currentLife + Rnd(-_currentLifeVariation, this._currentLifeVariation) * parentEffect.GetCurrentLife()));

                 // speed
                 e.SetSpeedVecX(0);
                 e.SetSpeedVecY(0);
                 if (!this._bypassSpeed)
                 {
                     e.SetSpeed(this._cVelocity.Get(0));
                     e.SetVelVariation(Rnd(-_currentSpeedVariation, this._currentSpeedVariation));
                     e.SetBaseSpeed((this._currentSpeed + e.GetVelVariation()) * parentEffect.GetCurrentVelocity());
                     //e._velSeed = Rnd(0, 1.0f);
                     e.SetSpeed(this._cVelocity.Get(0) * e.GetBaseSpeed() * this._cGlobalVelocity.Get(0));
                 }
                 else
                 {
                     e.SetSpeed(0);
                 }

                 // size
                 e.SetGSizeX(parentEffect.GetCurrentSizeX());
                 e.SetGSizeY(parentEffect.GetCurrentSizeY());

                 // width
                 var scaleTemp = this._cScaleX.Get(0);
                 var sizeTemp = 0;
                 e.SetScaleVariationX(Rnd(this._currentSizeXVariation));
                 e.SetWidth(e.GetScaleVariationX() + this._currentSizeX);
                 if (scaleTemp != 0)
                 {
                     sizeTemp = (e.GetWidth() / this._image.GetWidth()) * scaleTemp * e.GetGSizeX();
                 }
                 e.SetScaleX(sizeTemp);

                 if (this._uniform)
                 {
                     // height
                     e.SetScaleY(sizeTemp);

                     if (!this._bypassStretch)
                     {
                         e.SetScaleY((GetEmitterScaleX(0) * e.GetGSizeX() * (e.GetWidth() + (fabsf(e.GetSpeed()) * this.GEmitterStretch(0) * parentEffect.GetCurrentStretch()))) / this._image.GetWidth());
                         if (e.GetScaleY() < e.GetScaleX())
                             e.SetScaleY(e.GetScaleX());
                     }

                     e.SetWidthHeightAABB(this._AABB_ParticleMinWidth, this._AABB_ParticleMaxWidth, this._AABB_ParticleMinWidth, this._AABB_ParticleMaxWidth);
                 }
                 else
                 {
                     // height
                     scaleTemp = this.GEmitterScaleY(0);
                     sizeTemp = 0;
                     e.SetScaleVariationY(Rnd(this._currentSizeYVariation));
                     e.SetHeight(e.GetScaleVariationY() + this._currentSizeY);
                     if (scaleTemp != 0)
                     {
                         sizeTemp = (e.GetHeight() / this._image.GetHeight()) * scaleTemp * e.GetGSizeY();
                     }
                     e.SetScaleY(sizeTemp);

                     if (!this._bypassStretch && e.GetSpeed() != 0)
                     {
                         e.SetScaleY((GetEmitterScaleY(0) * e.GetGSizeY() * (e.GetHeight() + (fabsf(e.GetSpeed()) * this.GEmitterStretch(0) * parentEffect.GetCurrentStretch()))) / this._image.GetHeight());
                         if (e.GetScaleY() < e.GetScaleX())
                             e.SetScaleY(e.GetScaleX());
                     }

                     e.SetWidthHeightAABB(this._AABB_ParticleMinWidth, this._AABB_ParticleMaxWidth, this._AABB_ParticleMinHeight, this._AABB_ParticleMaxHeight);
                 }

                 // splatter
                 if (!this._bypassSplatter)
                 {
                     var splatterTemp = this.GEmitterSplatter(curFrame);
                     var splatX = Rnd(-splatterTemp, splatterTemp);
                     var splatY = Rnd(-splatterTemp, splatterTemp);

                     while (Vector2::GetDistance(0, 0, splatX, splatY) >= splatterTemp && splatterTemp > 0)
                     {
                         splatX = Rnd(-splatterTemp, splatterTemp);
                         splatY = Rnd(-splatterTemp, splatterTemp);
                     }

                     if (this._z == 1 || e.IsRelative())
                     {
                         e.Move(splatX, splatY);
                     }
                     else
                     {
                         e.Move(splatX * this._z, splatY * this._z);
                     }
                 }

                 // rotation and direction of travel settings
                 e.MiniUpdate();
                 if (parentEffect.GetTraverseEdge() && parentEffect.GetClass() == TypeLine)
                 {
                     e.SetDirectionLocked(true);
                     e.SetEntityDirection(90.0f);
                 }
                 else
                 {
                     if (parentEffect.GetClass() != TypePoint)
                     {
                         if (!this._bypassSpeed || this._angleType == AngAlign)
                         {
                             e.SetEmissionAngle(this._currentEmissionAngle + Rnd(-er, er));
                             switch (parentEffect.GetEmissionType())
                             {
                             case EmInwards:
                                 if (e.IsRelative())
                                     e.SetEmissionAngle(e.GetEmissionAngle() + Vector2::GetDirection(e.GetX(), e.GetY(), 0, 0));
                                 else
                                     e.SetEmissionAngle(e.GetEmissionAngle() + Vector2::GetDirection(e.GetWX(), e.GetWY(), e.GetParent().GetWX(), e.GetParent().GetWY()));
                                 break;

                             case EmOutwards:
                                 if (e.IsRelative())
                                     e.SetEmissionAngle(e.GetEmissionAngle() + Vector2::GetDirection(0, 0, e.GetX(), e.GetY()));
                                 else
                                     e.SetEmissionAngle(e.GetEmissionAngle() + Vector2::GetDirection(e.GetParent().GetWX(), e.GetParent().GetWY(), e.GetWX(), e.GetWY()));
                                 break;

                             case EmInAndOut:
                                 if (this._dirAlternater)
                                 {
                                     if (e.IsRelative())
                                         e.SetEmissionAngle(e.GetEmissionAngle() + Vector2::GetDirection(0, 0, e.GetX(), e.GetY()));
                                     else
                                         e.SetEmissionAngle(e.GetEmissionAngle() + Vector2::GetDirection(e.GetParent().GetWX(), e.GetParent().GetWY(), e.GetWX(), e.GetWY()));
                                 }
                                 else
                                 {
                                     if (e.IsRelative())
                                         e.SetEmissionAngle(e.GetEmissionAngle() + Vector2::GetDirection(e.GetX(), e.GetY(), 0, 0));
                                     else
                                         e.SetEmissionAngle(e.GetEmissionAngle() + Vector2::GetDirection(e.GetWX(), e.GetWY(), e.GetParent().GetWX(), e.GetParent().GetWY()));
                                 }
                                 this._dirAlternater = !this._dirAlternater;
                                 break;

                             case EmSpecified:
                                 // nothing
                                 break;
                             }
                         }
                     }
                     else
                     {
                         e.SetEmissionAngle(this._currentEmissionAngle + Rnd(-er, er));
                     }

                     if (!this._bypassDirectionvariation)
                     {
                         e.SetDirectionVairation(this._currentDirectionVariation);
                         var dv = e.GetDirectionVariation() * this.GEmitterDirectionVariationOT(0);
                         e.SetEntityDirection(e.GetEmissionAngle() + this.GetEmitterDirection(0) + Rnd(-dv, dv));
                     }
                     else
                     {
                         e.SetEntityDirection(e.GetEmissionAngle() + this.GetEmitterDirection(0));
                     }
                 }

                 // ------ e._lockedAngle = _lockedAngle
                 if (!this._bypassSpin)
                 {
                     e.SetSpinVariation(Rnd(-_currentSpinVariation, this._currentSpinVariation) + this._currentSpin);    // @todo dan currentSpin?
                 }

                 // weight
                 if (!this._bypassWeight)
                 {
                     e.SetWeight(GetEmitterWeight(0));
                     e.SetWeightVariation(Rnd(-_currentWeightVariation, this._currentWeightVariation));
                     e.SetBaseWeight((this._currentWeight + e.GetWeightVariation()) * parentEffect.GetCurrentWeight());
                 }

                 // -------------------
                 if (this._lockedAngle)
                 {
                     if (!this._bypassWeight && !this._bypassSpeed && !parentEffect.IsBypassWeight())
                     {
                         e.SetSpeedVecX(sinf(e.GetEntityDirection() / 180.0* M_PI));
                         e.SetSpeedVecY(cosf(e.GetEntityDirection() / 180.0* M_PI));
                         e.SetAngle(Vector2::GetDirection(0, 0, e.GetSpeedVecX(), -e.GetSpeedVecY()));
                     }
                     else
                     {
                         if (parentEffect.GetTraverseEdge())
                         {
                             e.SetAngle(parentEffect.GetAngle() + this._angleOffset);
                         }
                         else
                         {
                             e.SetAngle(e.GetEntityDirection() + this._angle + this._angleOffset);
                         }
                     }
                 }
                 else
                 {
                     switch (this._angleType)
                     {
                     case AngAlign:
                         if (parentEffect.GetTraverseEdge())
                             e.SetAngle(parentEffect.GetAngle() + this._angleOffset);
                         else
                             e.SetAngle(e.GetEntityDirection() + this._angleOffset);
                         break;

                     case AngRandom:
                         e.SetAngle(Rnd(this._angleOffset));
                         break;

                     case AngSpecify:
                         e.SetAngle(this._angleOffset);
                         break;
                     }
                 }

                 // color settings
                 if (this._randomColor)
                 {
                     var randomAge = Rnd(this._cR.GetLastFrame());
                     e.SetRed(RandomizeR(e, randomAge));
                     e.SetGreen(RandomizeG(e, randomAge));
                     e.SetBlue(RandomizeB(e, randomAge));
                 }
                 else
                 {
                     e.SetRed(GetEmitterR(0));
                     e.SetGreen(GetEmitterG(0));
                     e.SetBlue(GetEmitterB(0));
                 }
                 e.SetEntityAlpha(e.GetEmitter().GetEmitterAlpha(e.GetAge(), e.GetLifeTime()) * parentEffect.GetCurrentAlpha());

                 // blend mode
                 e._blendMode = this._blendMode;

                 // animation and framerate
                 e._animating = this._animate;
                 e._animateOnce = this._once;
                 e._framerate = this.GEmitterFramerate(0);
                 if (this._randomStartFrame)
                     e._currentFrame = Rnd(e._avatar.GetFramesCount());
                 else
                     e._currentFrame = this._currentFrame;

                 // add any sub children
                 //e._runChildren = false;

                 for (var i=0;i<this._effects.length;i++)
                 {
                     this._effects[i].ChangeDoB(dob);

                     Effect* newEffect = new Effect(this._effects[i]., pm);
                     newEffect.SetParent(e);
                     newEffect.SetParentEmitter(this);
                     newEffect.SetEffectLayer(e._effectLayer);
                 }

                 parentEffect.SetParticlesCreated(true);

                 // get the relative angle
                 if (!this._relative)
                 {  // @todo dan Set(cosf(this._angle  ??
                     e._matrix.Set(cosf(e._angle / 180.0* M_PI), sinf(e._angle / 180.0* M_PI), -sinf(e._angle / 180.0* M_PI), cosf(e._angle / 180.0* M_PI));
                     e._matrix = e._matrix.Transform(this._parent.GetMatrix());
                 }
                 e._relativeAngle = this._parent.GetRelativeAngle() + e._angle;
                 e.UpdateEntityRadius();
                 e.UpdateBoundingBox();

                 // capture old values for tweening
                 e.Capture();

             }
         }
         this._counter -= intCounter;
     }
 },

 ControlParticle:function( e )
 {
     var parentEffect = this._parentEffect;
     ParticleManager* pm = parentEffect.GetParticleManager();

     // alpha change
     if (this._alphaRepeat > 1)
     {
         e._rptAgeA += EffectsLibrary.GetCurrentUpdateTime() * this._alphaRepeat;
         e._alpha = this.GEmitterAlpha(e._rptAgeA, e._lifeTime) * parentEffect.GetCurrentAlpha();
         if (e._rptAgeA > e._lifeTime && e._aCycles < this._alphaRepeat)
         {
             e._rptAgeA -= e._lifeTime;
             ++e._aCycles;
         }
     }
     else
     {
         e._alpha = this.GEmitterAlpha(e._age, e._lifeTime) * parentEffect.GetCurrentAlpha();
     }

     // angle changes
     if (this._lockedAngle && this._angleType == AngAlign)
     {
         if (e._directionLocked)
         {
             e._angle = parentEffect.GetAngle() + this._angle + this._angleOffset;
         }
         else
         {
             if (!this._bypassWeight && !parentEffect.IsBypassWeight() || e._direction)
             {
                 if (e._oldWX != e._wx && e._oldWY != e._wy)
                 {
                     if (e._relative)
                         e._angle = Vector2::GetDirection(e._oldX, e._oldY, e._x, e._y);
                     else
                         e._angle = Vector2::GetDirection(e._oldWX, e._oldWY, e._wx, e._wy);

                     if (fabsf(e._oldAngle - e._angle) > 180)
                     {
                         if (e._oldAngle > e._angle)
                             e._oldAngle -= 360;
                         else
                             e._oldAngle += 360;
                     }
                 }
             }
             else
             {
                 e._angle = e._direction + this._angle + this._angleOffset;
             }
         }
     }
     else
     {
         if (!this._bypassSpin)
             e._angle += (GetEmitterSpin(e._age, e._lifeTime) * e._spinVariation * parentEffect.GetCurrentSpin()) / EffectsLibrary.GetCurrentUpdateTime();
     }

     // direction changes and motion randomness
     if (e._directionLocked)
     {
         e._direction = 90;
         switch (parentEffect.GetClass())
         {
         case TypeLine:
             if (parentEffect.GetDistanceSetByLife())
             {
                 var life = e._age / e._lifeTime;
                 e._x = (life * parentEffect.GetCurrentWidth()) - parentEffect.GetHandleX();
             }
             else
             {
                 switch (parentEffect.GetEndBehavior())
                 {
                 case EndKill:
                     if (e._x > parentEffect.GetCurrentWidth() - parentEffect.GetHandleX() || e._x < 0 - parentEffect.GetHandleX())
                         e._dead = 2;
                     break;

                 case EndLoopAround:
                     if (e._x > parentEffect.GetCurrentWidth() - parentEffect.GetHandleX())
                     {
                         e._x = (-parentEffect.GetHandleX());
                         e.MiniUpdate();
                         e._oldX = e._x;
                         e._oldWX = e._wx;
                         e._oldWY = e._wy;
                     }
                     else if (e._x < 0 - parentEffect.GetHandleX())
                     {
                         e._x = parentEffect.GetCurrentWidth() - parentEffect.GetHandleX();
                         e.MiniUpdate();
                         e._oldX = e._x;
                         e._oldWX = e._wx;
                         e._oldWY = e._wy;
                     }
                     break;
                 }
             }
         }
     }
     else
     {
         if (!this._bypassDirectionvariation)
         {
             var dv = e._directionVariation * this.GEmitterDirectionVariationOT(e._age, e._lifeTime);
             e._timeTracker += (int)EffectsLibrary.GetUpdateTime();
             if (e._timeTracker > EffectsLibrary.motionVariationInterval)
             {
                 e._randomDirection += EffectsLibrary.maxDirectionVariation * Rnd(-dv, dv);
                 e._randomSpeed += EffectsLibrary.maxVelocityVariation * Rnd(-dv, dv);
                 e._timeTracker = 0;
             }
         }
         e._direction = e._emissionAngle + this.GEmitterDirection(e._age, e._lifeTime) + e._randomDirection;
     }

     // size changes
     if (!this._bypassScaleX)
     {
         e._scaleX = (GetEmitterScaleX(e._age, e._lifeTime) * e._gSizeX * e._width) / this._image.GetWidth();
     }
     if (this._uniform)
     {
         if (!this._bypassScaleX)
             e._scaleY = e._scaleX;
     }
     else
     {
         if (!this._bypassScaleY)
         {
             e._scaleY = (GetEmitterScaleY(e._age, e._lifeTime) * e._gSizeY * e._height) / this._image.GetHeight();
         }
     }

     // color changes
     if (!this._bypassColor)
     {
         if (!this._randomColor)
         {
             if (this._colorRepeat > 1)
             {
                 e._rptAgeC += EffectsLibrary.GetCurrentUpdateTime() * this._colorRepeat;
                 e._red = this.GEmitterR(e._rptAgeC, e._lifeTime);
                 e._green = this.GEmitterG(e._rptAgeC, e._lifeTime);
                 e._blue = this.GEmitterB(e._rptAgeC, e._lifeTime);
                 if (e._rptAgeC > e._lifeTime && e._cCycles < this._colorRepeat)
                 {
                     e._rptAgeC -= e._lifeTime;
                     ++e._cCycles;
                 }
             }
             else
             {
                 e._red = this.GEmitterR(e._age, e._lifeTime);
                 e._green = this.GEmitterG(e._age, e._lifeTime);
                 e._blue = this.GEmitterB(e._age, e._lifeTime);
             }
         }
     }

     // animation
     if (!this._bypassFramerate)
         e._framerate = this.GEmitterFramerate(e._age, e._lifeTime) * this._animationDirection;

     // speed changes
     if (!this._bypassSpeed)
     {
         e._speed = this.GEmitterVelocity(e._age, e._lifeTime) * e._baseSpeed * this.GEmitterGlobalVelocity(parentEffect.GetCurrentEffectFrame());
         e._speed += e._randomSpeed;
     }
     else
     {
         e._speed = e._randomSpeed;
     }

     // stretch
     if (!this._bypassStretch)
     {
         if (!this._bypassWeight && !parentEffect.IsBypassWeight())
         {
             if (e._speed != 0)
             {
                 e._speedVec.x = e._speedVec.x / EffectsLibrary.GetCurrentUpdateTime();
                 e._speedVec.y = e._speedVec.y / EffectsLibrary.GetCurrentUpdateTime() - e._gravity;
             }
             else
             {
                 e._speedVec.x = 0;
                 e._speedVec.y = -e._gravity;
             }

             if (this._uniform)
                 e._scaleY = (GetEmitterScaleX(e._age, e._lifeTime) * e._gSizeX * (e._width + (fabsf(e._speed) * this.GEmitterStretch(e._age, e._lifeTime) * parentEffect.GetCurrentStretch()))) / this._image.GetWidth();
             else
                 e._scaleY = (GetEmitterScaleY(e._age, e._lifeTime) * e._gSizeY * (e._height + (fabsf(e._speed) * this.GEmitterStretch(e._age, e._lifeTime) * parentEffect.GetCurrentStretch()))) / this._image.GetHeight();
         }
         else
         {
             if (this._uniform)
                 e._scaleY = (GetEmitterScaleX(e._age, e._lifeTime) * e._gSizeX * (e._width + (fabsf(e._speed) * this.GEmitterStretch(e._age, e._lifeTime) * parentEffect.GetCurrentStretch()))) / this._image.GetWidth();
             else
                 e._scaleY = (GetEmitterScaleY(e._age, e._lifeTime) * e._gSizeY * (e._height + (fabsf(e._speed) * this.GEmitterStretch(e._age, e._lifeTime) * parentEffect.GetCurrentStretch()))) / this._image.GetHeight();
         }

         if (e._scaleY < e._scaleX)
             e._scaleY = e._scaleX;
     }

     // weight changes
     if (!this._bypassWeight)
         e._weight = this.GEmitterWeight(e._age, e._lifeTime) * e._baseWeight;
 },

 RandomizeR:function( e, randomAge )
 {
     return this._cR.GetOT(randomAge, e.GetLifeTime(), false);
 },

 RandomizeG:function( e, randomAge )
 {
     return this._cG.GetOT(randomAge, e.GetLifeTime(), false);
 },

 RandomizeB:function( e, randomAge )
 {
     return this._cB.GetOT(randomAge, e.GetLifeTime(), false);
 },

 DrawCurrentFrame:function( x /*= 0*/, y /*= 0*/, w /*= 128.0f*/, h /*= 128.0f*/ )
 {
     if (this._image)
     {
         /*
         SetAlpha(1.0f);
         SetBlend(this._blendMode);
         SetImageHandle(this._image.GetImage(), 0, 0);
         SetColor(255, 255, 255);
         SetScale(w / _image.GetWidth(), _image.GetHeight());
         _image.Draw(x, y, _frame);
         */
     }
 },

 CompileAll:function()
 {
     // base
     this._cLife.Compile();
     this._cLifeVariation.Compile();
     this._cAmount.Compile();
     this._cSizeX.Compile();
     this._cSizeY.Compile();
     this._cBaseSpeed.Compile();
     this._cBaseWeight.Compile();
     this._cBaseSpin.Compile();
     this._cEmissionAngle.Compile();
     this._cEmissionRange.Compile();
     this._cSplatter.Compile();
     this._cVelVariation.Compile();
     this._cWeightVariation.Compile();
     this._cAmountVariation.Compile();
     this._cSizeXVariation.Compile();
     this._cSizeYVariation.Compile();
     this._cSpinVariation.Compile();
     this._cDirectionVariation.Compile();
     // over lifetime
     var longestLife = this.GLongestLife();
     this._cAlpha.CompileOT(longestLife);
     this._cR.CompileOT(longestLife);
     this._cG.CompileOT(longestLife);
     this._cB.CompileOT(longestLife);
     this._cScaleX.CompileOT(longestLife);
     this._cScaleY.CompileOT(longestLife);
     this._cSpin.CompileOT(longestLife);
     this._cVelocity.CompileOT(longestLife);
     this._cWeight.CompileOT(longestLife);
     this._cDirection.CompileOT(longestLife);
     this._cDirectionVariationOT.CompileOT(longestLife);
     this._cFramerate.CompileOT(longestLife);
     this._cStretch.CompileOT(longestLife);
     // global adjusters
     this._cGlobalVelocity.Compile();

     for(var i=0;i<this._effects.length;i++)
     {
       this._effects[i].CompileAll();
     }

     this.AnalyseEmitter();
 },

 CompileQuick:function()
 {
     var longestLife = this.GetLongestLife();

     this._cAlpha.Clear(1);
     this._cAlpha.SetCompiled(0, this.GEmitterAlpha(0, longestLife));

     this._cR.Clear(1);
     this._cG.Clear(1);
     this._cB.Clear(1);
     this._cR.SetCompiled(0, this.GetEmitterR(0, longestLife));
     this._cG.SetCompiled(0, this.GetEmitterG(0, longestLife));
     this._cB.SetCompiled(0, this.GetEmitterB(0, longestLife));

     this._cScaleX.Clear(1);
     this._cScaleY.Clear(1);
     this._cScaleX.SetCompiled(0, this.GetEmitterScaleX(0, longestLife));
     this._cScaleY.SetCompiled(0, this.GetEmitterScaleY(0, longestLife));

     this._cVelocity.Clear(1);
     this._cVelocity.SetCompiled(0, this.GetEmitterVelocity(0, longestLife));

     this._cWeight.Clear(1);
     this._cWeight.SetCompiled(0, this.GetEmitterWeight(0, longestLife));

     this._cDirection.Clear(1);
     this._cDirection.SetCompiled(0, this.GetEmitterDirection(0, longestLife));

     this._cDirectionVariationOT.Clear(1);
     this._cDirectionVariationOT.SetCompiled(0, this.GetEmitterDirectionVariationOT(0, longestLife));

     this._cFramerate.Clear(1);
     this._cFramerate.SetCompiled(0, this.GetEmitterFramerate(0, longestLife));

     this._cStretch.Clear(1);
     this._cStretch.SetCompiled(0, this.GetEmitterStretch(0, longestLife));

     this._cSplatter.Clear(1);
     this._cSplatter.SetCompiled(0, this.GetEmitterSplatter(0));
 },

 AnalyseEmitter:function()
 {
     this.ResetBypassers();

     if (!this._cLifeVariation.GetLastFrame() && !this.GetEmitterLifeVariation(0))
         this._bypassLifeVariation = true;

     if (!this.GetEmitterStretch(0, 1.0))
         this._bypassStretch = true;

     if (!this._cFramerate.GetLastFrame() && !this.GetEmitterSplatter(0))
         this._bypassFramerate = true;

     if (!this._cSplatter.GetLastFrame() && !this._cSplatter.Get(0))
         this._bypassSplatter = true;

     if (!this._cBaseWeight.GetLastFrame() && !this._cWeightVariation.GetLastFrame() && !this.GetEmitterBaseWeight(0) && !this.GetEmitterWeightVariation(0))
         this._bypassWeight = true;

     if (!this._cWeight.GetLastFrame() && !this._cWeight.Get(0))
         this._bypassWeight = true;

     if (!this._cBaseSpeed.GetLastFrame() && !this._cVelVariation.GetLastFrame() && !this.GetEmitterBaseSpeed(0) && !this.GetEmitterVelVariation(0))
         this._bypassSpeed = true;

     if (!this._cBaseSpin.GetLastFrame() && !this._cSpinVariation.GetLastFrame() && !this.GetEmitterBaseSpin(0) && !this.GetEmitterSpinVariation(0))
         this._bypassSpin = true;

     if (!this._cDirectionVariation.GetLastFrame() && !this.GetEmitterDirectionVariation(0))
         this._bypassDirectionvariation = true;

     if (this._cR.GetAttributesCount() <= 1)
     {
         this._bRed = this.GetEmitterR(0, 1.0) != 0;             // @todo dan ???
         this._bGreen = this.GetEmitterG(0, 1.0) != 0;
         this._bBlue = this.GetEmitterB(0, 1.0) != 0;
         this._bypassColor = true;
     }

     if (this._cScaleX.GetAttributesCount() <= 1)
         this._bypassScaleX = true;

     if (this._cScaleY.GetAttributesCount() <= 1)
         this._bypassScaleY = true;
 },

 ResetBypassers:function()
 {
     this._bypassWeight = false;
     this._bypassSpeed = false;
     this._bypassSpin = false;
     this._bypassDirectionvariation = false;
     this._bypassColor = false;
     this._bRed = false;
     this._bGreen = false;
     this._bBlue = false;
     this._bypassScaleX = false;
     this._bypassScaleY = false;
     this._bypassLifeVariation = false;
     this._bypassFramerate = false;
     this._bypassStretch = false;
     this._bypassSplatter = false;
 },

 GetLongestLife:function()
 {
     var longestLife = ( this._cLifeVariation.GetMaxValue() + this._cLife.GetMaxValue() ) * this._parentEffect.GetLifeMaxValue();

     return longestLife;
 },

 GetEmitterLife:function( frame )
 {
     return this._cLife.Get(frame);
 },

 GetEmitterLifeVariation:function( frame )
 {
     return this._cLifeVariation.Get(frame);
 },

 GetEmitterAmount:function( frame )
 {
     return this._cAmount.Get(frame);
 },

 GetEmitterSizeX:function( frame )
 {
     return this._cSizeX.Get(frame);
 },

 GetEmitterSizeY:function( frame )
 {
     return this._cSizeY.Get(frame);
 },

 GetEmitterBaseSpeed:function( frame )
 {
     return this._cBaseSpeed.Get(frame);
 },

 GetEmitterBaseWeight:function( frame )
 {
     return this._cBaseWeight.Get(frame);
 },

 GetEmitterBaseSpin:function( frame )
 {
     return this._cBaseSpin.Get(frame);
 },

 GetEmitterEmissionAngle:function( frame )
 {
     return this._cEmissionAngle.Get(frame);
 },

 GetEmitterEmissionRange:function( frame )
 {
     return this._cEmissionRange.Get(frame);
 },

 GetEmitterSplatter:function( frame )
 {
     return this._cSplatter.Get(frame);
 },

 GetEmitterVelVariation:function( frame )
 {
     return this._cVelVariation.Get(frame);
 },

 GetEmitterWeightVariation:function( frame )
 {
     return this._cWeightVariation.Get(frame);
 },

 GetEmitterAmountVariation:function( frame )
 {
     return this._cAmountVariation.Get(frame);
 },

 GetEmitterSizeXVariation:function( frame )
 {
     return this._cSizeXVariation.Get(frame);
 },

 GetEmitterSizeYVariation:function( frame )
 {
     return this._cSizeYVariation.Get(frame);
 },

 GetEmitterSpinVariation:function( frame )
 {
     return this._cSpinVariation.Get(frame);
 },

 GetEmitterDirectionVariation:function( frame )
 {
     return this._cDirectionVariation.Get(frame);
 },

 GetEmitterAlpha:function( age, lifetime )
 {
     return this._cAlpha.GetOT(age, lifetime);
 },

 GetEmitterR:function( age, lifetime )
 {
     return this._cR.GetOT(age, lifetime);
 },

 GetEmitterG:function( age, lifetime )
 {
     return this._cG.GetOT(age, lifetime);
 },

 GetEmitterB:function( age, lifetime )
 {
     return this._cB.GetOT(age, lifetime);
 },

 GetEmitterScaleX:function( age, lifetime )
 {
     return this._cScaleX.GetOT(age, lifetime);
 },

 GetEmitterScaleY:function( age, lifetime )
 {
     return this._cScaleY.GetOT(age, lifetime);
 },

 GetEmitterSpin:function( age, lifetime )
 {
     return this._cSpin.GetOT(age, lifetime);
 },

 GetEmitterVelocity:function( age, lifetime )
 {
     return this._cVelocity.GetOT(age, lifetime);
 },

 GetEmitterWeight:function( age, lifetime )
 {
     return this._cWeight.GetOT(age, lifetime);
 },

 GetEmitterDirection:function( age, lifetime )
 {
     return this._cDirection.GetOT(age, lifetime);
 },

 GetEmitterDirectionVariationOT:function( age, lifetime )
 {
     return this._cDirectionVariationOT.GetOT(age, lifetime);
 },

 GetEmitterFramerate:function( age, lifetime )
 {
     return this._cFramerate.GetOT(age, lifetime);
 },

 GetEmitterStretch:function( age, lifetime )
 {
     return this._cStretch.GetOT(age, lifetime);
 },

 GetEmitterGlobalVelocity:function( frame )
 {
     return this._cGlobalVelocity.Get(frame);
 },

 GetEffects:function()
 {
     return this._effects;
 },

 IsDying:function()
 {
     return this._dying;
 },

 SetPath:function( char *path )
 {
     this._path = path;
 },

});