<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Session\TokenMismatchException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{


    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);
        if ($e instanceof TokenMismatchException) {
        }

        switch ($e) {
            case $e instanceof TokenMismatchException:
                return back()->with([
                    'message' => 'The page expired, please try again. ',
                ]);
                break;

            case $e instanceof NotFoundHttpException:
                return back()->with([
                    'message' => 'The page is not found.',
                ]);
                break;
            default:
                return $response;
                break;
        }
    }
}
